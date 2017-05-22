module Style exposing (..)

import Css exposing (..)


body : List Mixin
body =
    [ fontSize (px 12)
    , displayFlex
    , flexDirection column
    , justifyContent center
    , fontFamilies [ "Arial", "Helvetica", .value sansSerif ]
    ]


header : List Mixin
header =
    [ displayFlex
    , justifyContent center
    , alignItems center
    , flexDirection column
    , backgroundColor (rgb 41 128 185)
    , color (rgb 236 240 241)
    , padding2 (Css.rem 1) zero
    ]


header__text : List Mixin
header__text =
    [ fontSize (Css.rem 3)
    ]


html : List Mixin
html =
    [ fontSize (pct 62.5) ]


hs : List Mixin
hs =
    [ margin zero
    ]


{-| Style the size of a single emoji
Takes a float to decide the font size
-}
emojionView : Float -> List Mixin
emojionView size =
    [ fontSize (px size)
    , listStyleType none
    ]


availableView : List Mixin
availableView =
    [ displayFlex
    , justifyContent center
    , maxWidth (pct 40)
    , flexWrap wrap
    , margin2 (zero) (auto)
    ]


{-| Style the li's that contain an emoji
Has a base style set, but is augmented if an emoji is selected
-}
availableLi : Bool -> List Mixin
availableLi hasBeenSelected =
    let
        shared =
            [ listStyleType none
            , justifyContent center
            , cursor pointer
            , padding2 (px 5) (px 10)
            ]

        isSelected =
            [ backgroundColor (rgb 100 200 200)
            ]
    in
        if hasBeenSelected then
            isSelected ++ shared
        else
            shared


selectedView : List Mixin
selectedView =
    [ displayFlex
    , justifyContent center
    , alignItems center
    , minHeight (px 180)
    , padding (px 0)
    ]


selectedLi : List Mixin
selectedLi =
    [ listStyleType none
    , flexDirection column
    , padding (px 20)
    , displayFlex
    , textAlign center
    , cursor pointer
    ]


moveButtonsView : List Mixin
moveButtonsView =
    [ displayFlex
    , backgroundColor (rgb 230 235 236)
    , alignSelf center
    , justifyContent center
    , margin (px 10)
    , borderRadius (px 5)
    ]



-- Buttons that are used to move emojis left and right in order.


moveArrow : List Mixin
moveArrow =
    [ backgroundColor (rgba 0 0 0 0)
    , fontSize (px 24)
    , border (zero)
    , padding2 (px 5) (px 15)
    ]
