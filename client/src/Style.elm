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
-}
availableLi : List Mixin
availableLi =
    [ listStyleType none
    , justifyContent center
    , padding (px 5)
    , cursor pointer
    ]


selectedView : List Mixin
selectedView =
    [ displayFlex
    , justifyContent center
    , alignItems center
    , minHeight (px 150)
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
