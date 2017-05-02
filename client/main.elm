module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


main : Program Never Model Msg
main =
    Html.beginnerProgram { model = model, view = view, update = update }


{- Let's define our model! We need the following:
   A type alias
   To set the type to the function "model"
   To actually write the model function
 -}


type alias Model =
    { buttonMessage : String
    , buttonOn : Bool
    }


model : Model
model =
    { buttonMessage = "I am on"
    , buttonOn = False
    }



{-Update Section. We need the following:
    * A union type for listing our actions
    * Set the update function have a type
    * To write the update function
-}


type Msg
    = ToggleButton


update : Msg -> Model -> Model
update msg model =
    case msg of
        ToggleButton ->
            { model
                | buttonOn = not model.buttonOn
                , buttonMessage = createButtonText model.buttonOn
            }


view : Model -> Html Msg
view model =
    button [ onClick ToggleButton ] [ text model.buttonMessage ]



-- LITTLE FUNCTIONS THAT MAKE UP OUR GOOD LIFE --


createButtonText : Bool -> String
createButtonText boolState =
    if boolState then
        "I am on"
    else
        "I am off"
