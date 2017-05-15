module Zipper exposing (Zipper, empty, zipTo, zipBy, moveBy, append, length, filter, toList, get, put, index, fromList, zipNext, zipPrev)


type Zipper a
    = Zipper (List a) (List a)


empty : Zipper a
empty =
    Zipper [] []


zipTo : Int -> Zipper a -> Maybe (Zipper a)
zipTo index (Zipper prevs nexts) =
    zipBy (index - List.length prevs) (Zipper prevs nexts)


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


zipPrev : Zipper a -> Maybe (Zipper a)
zipPrev (Zipper prevs nexts) =
    case prevs of
        [] ->
            Nothing

        x :: xs ->
            Just (Zipper xs (x :: nexts))


zipNext : Zipper a -> Maybe (Zipper a)
zipNext (Zipper prevs nexts) =
    case nexts of
        [] ->
            Nothing

        x :: xs ->
            Just (Zipper (x :: prevs) xs)


moveBy : Int -> Zipper a -> Maybe (Zipper a)
moveBy amount (Zipper prevs nexts) =
    case nexts of
        [] ->
            Nothing

        x :: xs ->
            zipBy amount (Zipper prevs xs)
                |> Maybe.map (put x)


append : a -> Zipper a -> Zipper a
append x (Zipper prevs nexts) =
    Zipper prevs (nexts ++ [ x ])


length : Zipper a -> Int
length (Zipper prevs nexts) =
    List.length prevs + List.length nexts


apply : (List a -> List a) -> Zipper a -> Zipper a
apply f (Zipper prevs nexts) =
    Zipper (f prevs) (f nexts)


filter : (a -> Bool) -> Zipper a -> Zipper a
filter f =
    apply (List.filter f)


toList : Zipper a -> List a
toList (Zipper prevs nexts) =
    List.reverse prevs ++ nexts


fromList : List a -> Zipper a
fromList xs =
    Zipper [] xs


get : Zipper a -> Maybe a
get (Zipper _ nexts) =
    List.head nexts


put : a -> Zipper a -> Zipper a
put x (Zipper prevs nexts) =
    Zipper prevs (x :: nexts)


index : Zipper a -> Int
index (Zipper prevs _) =
    List.length prevs
