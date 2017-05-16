module Zipper
    exposing
        ( Zipper
        , empty
        , zipTo
        , zipBy
        , moveBy
        , append
        , length
        , filter
        , apply
        , toList
        , get
        , put
        , index
        , fromList
        , zipNext
        , zipPrev
        )

{-| Zippers are data structures which encode a position and allow for fast access to that position.

Examples:

```
[1, 2, 3, 4, 5] |> fromList |> get == Just 1

[1, 2, 3, 4, 5] |> fromList |> zipNext |> zipNext |> get == Just 3

[1, 2, 3, 4, 5] |> fromList |> zipNext |> zipNext |> put 0 |> toList == [1, 2, 0, 3, 4, 5]
```

@docs Zipper

# Creation and Escape
@docs empty, fromList, toList

# Current Item Operations
@docs get, put

# Zipping
@docs zipNext, zipPrev, zipTo, zipBy

# Moving Elements
@docs moveBy

# Collection Operations
@docs filter, apply

# Information
@docs length, index
-}


{-| A list zipper which can be empty and can have a position past the tail end of the list.
-}
type Zipper a
    = Zipper (List a) (List a)


empty : Zipper a
empty =
    Zipper [] []


{-| Put the zipper at an absolute position. Zipping out of range fails with `Nothing`.
-}
zipTo : Int -> Zipper a -> Maybe (Zipper a)
zipTo index (Zipper prevs nexts) =
    zipBy (index - List.length prevs) (Zipper prevs nexts)


{-| Put the zipper at a position relative to the current position. Zipping out of range fails with `Nothing`.
-}
zipBy : Int -> Zipper a -> Maybe (Zipper a)
zipBy amount zipper =
    if amount > 0 then
        zipNext zipper
            |> Maybe.andThen (zipBy (amount - 1))
    else if amount < 0 then
        zipPrev zipper
            |> Maybe.andThen (zipBy (amount + 1))
    else
        Just zipper


{-| Put the zipper at a position one previous to the current. Zipping out of range fails with `Nothing`.
-}
zipPrev : Zipper a -> Maybe (Zipper a)
zipPrev (Zipper prevs nexts) =
    case prevs of
        [] ->
            Nothing

        x :: xs ->
            Just (Zipper xs (x :: nexts))


{-| Put the zipper at a position one after the current. Zipping out of range fails with `Nothing`.
-}
zipNext : Zipper a -> Maybe (Zipper a)
zipNext (Zipper prevs nexts) =
    case nexts of
        [] ->
            Nothing

        x :: xs ->
            Just (Zipper (x :: prevs) xs)


{-| Move an item a relative distance. Moving out of range fails with `Nothing`
-}
moveBy : Int -> Zipper a -> Maybe (Zipper a)
moveBy amount (Zipper prevs nexts) =
    case nexts of
        [] ->
            Nothing

        x :: xs ->
            zipBy amount (Zipper prevs xs)
                |> Maybe.map (put x)


{-| Add an item to the end of the list.
-}
append : a -> Zipper a -> Zipper a
append x (Zipper prevs nexts) =
    Zipper prevs (nexts ++ [ x ])


length : Zipper a -> Int
length (Zipper prevs nexts) =
    List.length prevs + List.length nexts


{-| Apply a function which transforms a list. Expects that the function handles each element independently so a properly typed `fold` may have unexpected results.
-}
apply : (List a -> List b) -> Zipper a -> Zipper b
apply f (Zipper prevs nexts) =
    Zipper (f prevs) (f nexts)


{-| Drops items for which the function produces `False`.
-}
filter : (a -> Bool) -> Zipper a -> Zipper a
filter f =
    apply (List.filter f)


toList : Zipper a -> List a
toList (Zipper prevs nexts) =
    List.reverse prevs ++ nexts


{-| Convert a list into a Zipper. Sets the initial position to 0.
-}
fromList : List a -> Zipper a
fromList xs =
    Zipper [] xs


{-| Get the item at the current position. Fails with `Nothing` if in a position beyond the tail end of the list.
-}
get : Zipper a -> Maybe a
get (Zipper _ nexts) =
    List.head nexts


{-| Put an item at the current position. The current item is pushed toward the tail.
-}
put : a -> Zipper a -> Zipper a
put x (Zipper prevs nexts) =
    Zipper prevs (x :: nexts)


{-| The index of the zipper's current position.
-}
index : Zipper a -> Int
index (Zipper prevs _) =
    List.length prevs
