module Main exposing (main)

import Css
import Html exposing (Html, div, header, h1, p, text)
import Html.Attributes exposing (..)


-- import Html.Events exposing (..)

import Style


main : Program Never Model Msg
main =
    Html.beginnerProgram { model = 0, update = update, view = view }


type Msg
    = Increment


type alias Model =
    Int


update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            model + 1


view : Model -> Html Msg
view model =
    div [ styles Style.body ]
        [ header [ styles Style.header ]
            [ h1 [ styles (Style.hs ++ Style.header__text) ]
                [ text "Emojion Bar" ]
            , p []
                [ text "Custom Emoji Reaction Bars for your sweet site." ]
            ]
        ]


styles : List Css.Mixin -> Html.Attribute msg
styles =
    Css.asPairs >> Html.Attributes.style
