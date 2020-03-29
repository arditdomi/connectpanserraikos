export class Player {
  name: string;
  surname: string;
  age: Date;
  team: string;
  email: string;
  photoURL?: string;

  constructor(name, surname, age, team, email, photoURL?) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.team = team;
    this.email = email;
    this.photoURL = photoURL;
  }

  isValid(): boolean {
    return (this.name !== undefined) && (this.surname !== undefined)
      && (this.age !== undefined) && (this.team !== undefined)
      && (this.email !== undefined);
  }

}
