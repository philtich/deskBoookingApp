import { useState, useEffect } from "react";
import Footer from '../common/Footer';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import {  Link } from "react-router-dom";
import { useAddToFavorites } from "../../Hooks/FavoritesHooks/useAddToFavorites";
import { useDeleteFavorite } from "../../Hooks/FavoritesHooks/useDeleteFavorite";
import { useGetDesks } from '../../Hooks/BookingHooks/useGetAllDesks';
import { AllOffices } from './AllOffices';
import { useGetProfile } from "../../Hooks/ProfileHooks/useGetProfile";
import { useGetUserFavorite } from "../../Hooks/FavoritesHooks/useGetUserFavorite";

export const BookingView = () => {
  const { data } = useGetDesks();
  const { data: userProfile } = useGetProfile();
  const userId = userProfile?.id;
  const { data: favoriteData } = useGetUserFavorite(userId);
  
  const desks = data
  const pageTitle = "Booking";
  const addToFavourites = useAddToFavorites();
  const deleteFromFavourites = useDeleteFavorite();
  const [favouriteDesks, setFavouriteDesks] = useState<string[]>([]);

  useEffect(() => {
    if (favoriteData) {
      const favoriteDeskIds = favoriteData.map(
        (favorite: string) => favorite.desk.id
      );
      setFavouriteDesks(favoriteDeskIds);
    }
  }, [favoriteData]);

  const [sameOffice, setSameOffice] = useState('');

  const handleOfficeSelect = (office: any) => {
    setSameOffice(office.id);
  };

  const filteredOffices = desks?.filter((desk) => {
    return desk.office.id  == sameOffice;
  });

  const handleAddToFavorites = (deskId: string) => {
    if (favouriteDesks.includes(deskId)) return;
    addToFavourites.mutate(deskId, {
      onSuccess: () => {
        setFavouriteDesks([...favouriteDesks, deskId]);
      },
    });
  };

  const handleRemoveFromFavorites = (favId: string) => {
    deleteFromFavourites.mutate(favId, {
      onSuccess: () => {
        const updatedFavorites = favouriteDesks.filter((deskId) => {
          const favorite = favoriteData?.find((fav) => fav.id === favId);
          return deskId !== favorite?.desk.id;
        });
        setFavouriteDesks(updatedFavorites);
      },
    });
  };

  return (
    <main>
      {/* sidenav   */}
      <Sidebar />
      {/* End sidenav */}

      <div className="dashMain">
        {/* Header */}
        <Header pageTitle={pageTitle} />
        {/* End Header */}

        {/* Set Offices */}
        <AllOffices
          setOffice = {(arr: object[]) => handleOfficeSelect(arr)}
          office={sameOffice}
        />
        {/* End Set Offices */}

        {/* Booking Section */}
        <section className="bookingSection container">
          <div className='bookingDeskViewAndColorParentDiv'>
            <h2 className="desksTitle">Desks:</h2>
            <div className='deskColor'>
              <span className='deskSpan'>
                Booked Fix Desks:&#160;
                <span className='fixRed'> </span>
              </span>

              <span className='deskSpan'>
                Flex Desks:&#160; 
                <span className='flexGreen'> </span>
              </span>
            </div>
          </div>

          <div className="desks">
            {filteredOffices?.length < 1 ?(
              <p className='desksErrorMessage'>
                No Desks available! You Have to Select an Office
              </p>
            ):(
            <div className="desksGrid">  
              {filteredOffices?.map((desk) => ( 
                <div key={desk.id} className={`gridCard  ${desk.fixdesk == null ? "bg-offWhite border-b-8 border-b-green" : "bg-offWhite border-b-8 border-b-red"}`}>
                  <p className="deskType">{desk.label}</p>
                  <p className="deskType">{desk?.office?.name}</p>
                  
                  <div className="cardInfo">
                     <Link to={`/${desk.id}`} className={`infoBtn ${desk.fixdesk != null ? "opacity-0" : "opacity-1"}`} >
                      Infos
                    </Link>
                    <img
                      src={
                        favouriteDesks.includes(desk.id)
                          ? "../../icons/favoriteHeart.svg"
                          : "../../icons/favoriteIcon.svg"
                      }
                      alt="Favorite Icon"
                      className="favoriteIcon w-8 h-8 relative"
                      onClick={() => {
                        if (favouriteDesks.includes(desk.id)) {
                          const favorite = favoriteData?.find(
                            (fav) => fav.desk.id === desk.id
                          );
                          const favId = favorite?.id;
                          if (favId) {
                            handleRemoveFromFavorites(favId);
                          }
                        } else {
                          handleAddToFavorites(desk.id);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>)}
          </div>
        </section>
        {/* End Booking Section */}

        {/* Footer */}
        <Footer />
        {/* End Footer */}
      </div>
    </main>
  ) 
}