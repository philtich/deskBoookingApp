import { useState } from "react";
import { useGetUserFavorite } from "../../Hooks/FavoritesHooks/useGetUserFavorite";
import { useGetProfile } from "../../Hooks/ProfileHooks/useGetProfile";
import { Link } from "react-router-dom";

export const FavoriteList = () => {
  const { data: userProfile } = useGetProfile();
  const FAVORITES_PAGE_SIZE = 5;
  const userId = userProfile?.id;
  const [favoritesPage, setFavoritesPage] = useState(1);
  const { data: favorites, isLoading: favoritesLoading } =
    useGetUserFavorite(userId);
  const totalFavorites = favorites?.length || 0;
  const totalFavoritesPages = Math.ceil(totalFavorites / FAVORITES_PAGE_SIZE);

  const handleNextFavoritesPage = () => {
    setFavoritesPage((prevPage) => Math.min(prevPage + 1, totalFavoritesPages));
  };

  const handlePreviousFavoritesPage = () => {
    setFavoritesPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedFavorites = favorites?.slice(
    (favoritesPage - 1) * FAVORITES_PAGE_SIZE,
    favoritesPage * FAVORITES_PAGE_SIZE
  );

  return (
    <div className="overflow-x-auto">
      <div className="paginationAndTitle">
        <div className="pagination">
          <button
            onClick={handlePreviousFavoritesPage}
            className={`font-bold ${favoritesPage === 1 ? 'text-offWhite' : 'text-darkBlue'}`}
          >
            Previous
          </button>

          <span>
            Page {favoritesPage} of {totalFavoritesPages}
          </span>
          
          <button
            onClick={handleNextFavoritesPage}
            className={`font-bold ${
              favoritesPage === totalFavoritesPages ? 'text-offWhite' : 'text-darkBlue'
            }`}
          >
            Next
          </button>
        </div>

        <div className="tablesTitle">
          <h3>
            Favorite List
          </h3>
        </div>
      </div>

      <table className="w-full container">
        <thead className="tableHead">
          <tr className="tHeadTr">
            <th className="tHeadTh">Desk</th>
            <th className="tHeadTh">Office</th>
            <th className="tHeadTdAction">Book Favorite</th>
          </tr>
        </thead>

        <tbody className="tableBody">
          {favoritesLoading ? (
            <tr className="tBodyTr">
              <td className="tHeadTd" colSpan={4}>Loading...</td>
            </tr>
          ) : paginatedFavorites && paginatedFavorites.length > 0 ? (
            paginatedFavorites.map((favorite) => (
              <tr key={favorite.id} className="tBodyTr">
                <td className="tHeadTd">
                  {favorite.desk.label}
                </td>
                <td className="tHeadTd">
                  {favorite.desk.office.name}
                </td>
                <td className="tBodyTdAction">
                  <Link
                    to={`/${favorite.desk.id}`}
                    className="userTableBtnLight"
                  >
                    Book Favorite
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr className="tBodyTr">
              <td className="tHeadTd" colSpan={4}>No favorites found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};