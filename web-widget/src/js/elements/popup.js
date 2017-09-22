import { className, MAX_COUNT } from '../consts.js';
import Element from './elements.js';
import { addClass, show, hide, xssEscape } from '../utils.js';

const EMPTY_STRING = '';
const TITLE_POPUP_MEMBER_LIST = 'Member List';
const MEMBER_POPUP_DEFAULT = -30;
const POPUP_DISTANCE = 300;

class Popup extends Element {
  constructor() {
    super();
    this._createMemberPopup();
  }

  reset() {
    this.closeMemberPopup();
  }

  closeMemberPopup() {
    hide(this.memberPopup);
    this._setContent(this.memberPopup.list, EMPTY_STRING);
  }

  showMemberPopup(chatSection, index) {
    chatSection.appendChild(this.memberPopup);
    this._setRight(this.memberPopup, MEMBER_POPUP_DEFAULT + index * POPUP_DISTANCE);
    show(this.memberPopup);
  }

  _createMemberPopup() {
    this.memberPopup = this.createDiv();
    this._setClass(this.memberPopup, [className.POPUP, className.MEMBERS]);

    var popupBody = this.createDiv();
    this._setClass(popupBody, [className.POPUP_BODY]);

    var popupTop = this.createDiv();
    this._setClass(popupTop, [className.POPUP_TOP]);

    var topTitle = this.createDiv();
    this._setClass(topTitle, [className.TITLE]);
    this._setContent(topTitle, TITLE_POPUP_MEMBER_LIST);
    popupTop.appendChild(topTitle);

    var topCount = this.createDiv();
    this._setClass(topCount, [className.COUNT]);
    this._setContent(topCount, '0');
    popupTop.appendChild(topCount);

    this.memberCloseBtn = this.createButton();
    this._setClass(this.memberCloseBtn, [className.BTN, className.IC_CLOSE]);
    popupTop.appendChild(this.memberCloseBtn);

    popupBody.appendChild(popupTop);

    var popupContent = this.createDiv();
    this._setClass(popupContent, [className.CONTENT]);

    var ul = this.createUl();
    popupContent.appendChild(ul);

    popupBody.appendChild(popupContent);

    this.memberPopup.list = ul;
    this.memberPopup.count = topCount;
    this.memberPopup.appendChild(popupBody);
  }

  updateCount(target, count) {
    count = parseInt(count);
    this._setContent(target, (count > 9) ? MAX_COUNT : count.toString());
  }

  createMemberItem(member, isCurrentUser) {
    var li = this.createLi();
    var div = this.createDiv();

    if (isCurrentUser) {
      var userProfileMe = this.createDiv();
      this._setClass(userProfileMe, [className.IMAGE_ME]);
      div.appendChild(userProfileMe);
    }

    var userProfile = this.createDiv();
    this._setClass(userProfile, [className.IMAGE]);
    this._setBackgroundImage(userProfile, member.profileUrl);
    div.appendChild(userProfile);

    var userNickname = this.createDiv();
    this._setClass(userNickname, [className.NICKNAME]);
    this._setContent(userNickname, xssEscape(member.nickname));
    div.appendChild(userNickname);

    li.appendChild(div);
    return li;
  }

  getSelectedUserIds(target) {
    let items = target.querySelectorAll('.' + className.ACTIVE);
    var userIds = [];
    for (var i = 0 ; i < items.length ; i++) {
      let item = items[i];
      userIds.push(item.getAttribute('data-user-id'));
    }
    return userIds;
  }

  addCloseBtnClickEvent(action) {
    this._setClickEvent(this.memberCloseBtn, () => {
      action();
    });
  }

  addClickEvent(target, action) {
    this._setClickEvent(target, action);
  }

}

export { Popup as default };
