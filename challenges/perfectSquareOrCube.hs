-- https://codefights.com/challenge/jtbjBgG7Fhhn7S4Ac/
import Data.List (permutations)
import Data.Set (Set)
import qualified Data.Set as Set

squares = map (\x -> x*x) [1..]
cubes = map (\x -> x*x*x) [1..]

perfectSquare n = n == (head $ dropWhile (<n) squares)
perfectCube n = n == (head $ dropWhile (<n) cubes)

perfectSquareOrCube 
    = length . Set.filter (\n -> perfectSquare n || perfectCube n) . combinations
    where combinations :: Int -> Set Int
          combinations = Set.fromList . map read . permutations . show
