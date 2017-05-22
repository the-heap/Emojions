module Style exposing (..)

import Css exposing (..)


body : List Mixin
body =
    [ fontSize (px 12)
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
    ]


{-| Style the li's that contain an emoji
-}
availableLi : List Mixin
availableLi =
    [ listStyleType none
    , justifyContent center
    ]


selectedView : List Mixin
selectedView =
    [ displayFlex
    , justifyContent center
    ]


selectedLi : List Mixin
selectedLi =
    [ listStyleType none
    , flexDirection column
    , padding (px 20)
    , displayFlex
    , textAlign center
    ]
