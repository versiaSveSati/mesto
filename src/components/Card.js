export default class Card {
    constructor(
      data,
      templateSelector,
      meID,
      handleImageClick,
      openDeletePopup,
      like,
      removeLike
    ) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._likesNumber = data.likes.length;
      this._ID = data._id;
      this._meID = meID;
      this._ownerID = data.owner._id;
      this._templateSelector = templateSelector;
      this._handleImageClick = handleImageClick;
      this._openDeletePopup = openDeletePopup;
      this._like = like;
      this._removeLike = removeLike;
    }
  
    _getTemplate() {
      return document
        .querySelector(this._templateSelector)
        .content.querySelector(".card")
        .cloneNode(true);
    }
  
    createCard() {
      this._element = this._getTemplate();
      this._showNumberOfLikes = this._element.querySelector(".gallery__like-number");////////?
      this._likeIcon = this._element.querySelector(".card__button");
      const cardImage = this._element.querySelector(".card__photo");
      cardImage.src = this._link;
      cardImage.alt = this._name;
      this._element.querySelector(".card__text").textContent = this._name;
      this._likeButton = this._element.querySelector(".card__like");
      this._setEventListeners();
      this._showCardButton();
      this._setLikesState(this._likes);
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element
        .querySelector(".card__button")
        .addEventListener("click", () => {
          this._handleCardTrash();
        });
      this._likeButton.addEventListener("click", () => {
        this._handleToggleLike();
      });
      this._element
        .querySelector(".card__photo")
        .addEventListener("click", () => {
          this._handleImageClick(this._data, this._data);
        });
    }
  
    _handleCardTrash() {
      this._openDeletePopup({ card: this, cardID: this._ID });
    }
  
    cardTrash() {
      this._element.remove();
      this._element = null;
    }
  
    _handleToggleLike() {
      if (this.hasLike) {
        this._removeLike(this._ID)
          .then((updatedCard) => {
            this._setLikesState(updatedCard.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при попытке убрать лайк ${error}`)
          );
      } else {
        this._like(this._ID)
          .then((updatedCard) => {
            this._setLikesState(updatedCard.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при попытке поставить лайк ${error}`)
          );
      }
    }
  
    _setLikesState(likes) {
      this._likes = likes;
      this._likesNumber = likes.length;
      this._showNumberOfLikes.textContent = this._likesNumber;
      this._setHasLike();
    }
  
    _showCardButton() {
      if (this._ownerID === this._meID) {
        this._likeIcon.style.display = "block";
      } else {
        this._likeIcon.style.display = "none";
      }
    }
  
    _setHasLike() {
      const hasLike = this._likes.some((element) => {
        return element._id === this._meID;
      });
      this.hasLike = hasLike;
      if (hasLike) {
        this._likeButton.classList.add("card__like_active");
      } else {
        this._likeButton.classList.remove("card__like_active");
      }
    }
  }