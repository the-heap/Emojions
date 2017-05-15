module Main exposing (main)

import Set exposing (Set)
import Css
import Html exposing (Attribute, Html, button, div, header, h1, input, label, li, p, text, ul)
import Html.Attributes exposing (checked, type_)
import Html.Events as Events exposing (onCheck, onClick, onWithOptions)
import Json.Decode as JD
import Zipper as Zip exposing (Zipper)
import Style


main : Program Never Model Msg
main =
    Html.beginnerProgram { model = init, update = update, view = view }


type Msg
    = Select Emojion
    | Deselect Emojion
    | ReorderTarget Int
    | ReorderPrev
    | ReorderNext


type alias Model =
    { available : List Emojion
    , selected : Zipper Emojion
    , emojionsSize : Int
    , error : Maybe String
    }


type alias Emojion =
    String


init : Model
init =
    { available = [ "a", "b", "c", "d", "e", "f", "g", "h", "i" ]
    , selected = Zip.empty
    , emojionsSize = 5
    , error = Nothing
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        Select emojion ->
            if Zip.length model.selected >= model.emojionsSize then
                { model | error = Just "Your Emojion bar is full, please deselect an emoji to make room." }
            else
                { model | selected = Zip.append emojion model.selected }

        Deselect emojion ->
            { model | selected = Zip.filter ((/=) emojion) model.selected }

        ReorderTarget index ->
            Zip.zipTo index model.selected
                |> maybeUpdateSelected model

        ReorderPrev ->
            Zip.moveBy -1 model.selected
                |> maybeUpdateSelected model

        ReorderNext ->
            Zip.moveBy 1 model.selected
                |> maybeUpdateSelected model


maybeUpdateSelected : Model -> Maybe (Zipper Emojion) -> Model
maybeUpdateSelected model maybe =
    maybe
        |> Maybe.map (\selected -> { model | selected = selected })
        |> Maybe.withDefault model


view : Model -> Html Msg
view model =
    div [ styles Style.body ]
        [ header [ styles Style.header ]
            [ h1 [ styles (Style.hs ++ Style.header__text) ]
                [ text "Emojion Bar" ]
            , p []
                [ text "Custom Emoji Reaction Bars for your sweet site." ]
            ]
        , selectedView model.selected
        , button [ onClick ReorderPrev ] [ text "Up" ]
        , button [ onClick ReorderNext ] [ text "Down" ]
        , availableView (Zip.toList model.selected) model.available
        ]


selectedView : Zipper Emojion -> Html Msg
selectedView emojions =
    let
        reorderSelect =
            Zip.index emojions
    in
        ul []
            (emojions
                |> Zip.toList
                |> List.indexedMap (selectedLi reorderSelect)
            )


selectedLi : Int -> Int -> Emojion -> Html Msg
selectedLi reorderSelect index emojion =
    li [ onClick (ReorderTarget index) ]
        [ emojionView emojion
        , if index == reorderSelect then
            text "selected"
          else
            text ""
        ]


availableView : List Emojion -> List Emojion -> Html Msg
availableView selectedList available =
    let
        selected =
            Set.fromList selectedList
    in
        ul [] (List.map (availableLi selected) available)


availableLi : Set Emojion -> Emojion -> Html Msg
availableLi selectedSet emojion =
    let
        selected =
            Set.member emojion selectedSet
    in
        li []
            [ label []
                [ input
                    [ type_ "checkbox"
                    , checked selected
                    , onCheckSuppressed (selectSwitch emojion)
                    ]
                    []
                , emojionView emojion
                ]
            ]


onCheckSuppressed : (Bool -> msg) -> Attribute msg
onCheckSuppressed f =
    onWithOptions "click"
        { stopPropagation = False, preventDefault = True }
        (JD.map f Events.targetChecked)


selectSwitch : Emojion -> Bool -> Msg
selectSwitch emojion bool =
    if bool then
        Select emojion
    else
        Deselect emojion


emojionView : Emojion -> Html msg
emojionView emojion =
    div [] [ text emojion ]


styles : List Css.Mixin -> Html.Attribute msg
styles =
    Css.asPairs >> Html.Attributes.style
