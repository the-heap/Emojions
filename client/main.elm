module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- main : Program Never Model Msg


main =
    Html.beginnerProgram { model = 0, update = update, view = view }



-- redundant


type Msg
    = Increment


-- redundant
update msg model =
    case msg of
        Increment ->
            model + 1



view model =
    div []
        [ header [ class "header" ]
            [ h1 [ class "header__text" ]
                [ text "Emojion Bar" ]
            , p []
                [ text "Custom Emoji Reaction Bars for your sweet site." ]
            ]
        , Html.node "link" [ Html.Attributes.rel "stylesheet", Html.Attributes.href "style.css" ] []
        ]
