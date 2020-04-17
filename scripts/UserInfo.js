class UserInfo {
  constructor(
    nameInput,
    aboutInput,
    nameElement,
    aboutElement,
    avatarElement,
    id,
    cohort
  ) {
    this.nameInput = nameInput;
    this.aboutInput = aboutInput;
    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
    this.name = nameElement.textContent;
    this.about = aboutElement.textContent;
    this.avatarElement = avatarElement;
    this.avatarImage = "url()";
    this.id = id;
    this.cohort = cohort;
  }

  setUserInfo() {
    this.name = this.nameInput.value;
    this.about = this.aboutInput.value;
  }

  updateUserInfo() {
    this.nameElement.textContent = this.name;
    this.aboutElement.textContent = this.about;
    this.avatarElement.style.backgroundImage = `url('${this.avatarImage}'`;
  }

  initUserInfo() {
    this.nameInput.value = this.name;
    this.aboutInput.value = this.about;
  }
  loadUserInfo({ name, about, avatar, _id, cohort }) {
    this.name = name;
    this.about = about;
    this.avatarImage = avatar;
    this.id = _id;
    this.cohort = cohort;
    this.updateUserInfo();
  }
}
