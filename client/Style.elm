module Style exposing (..)

import Css exposing (Mixin, alignItems, backgroundColor, center, color, column, inlineBlock, displayFlex, display, flexDirection, fontFamilies, fontSize, justifyContent, margin, padding, padding2, pct, px, rgb, sansSerif, zero)


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
    , padding zero
    ]


emojionView : List Mixin
emojionView =
    [ fontSize (px 64)
    ]
