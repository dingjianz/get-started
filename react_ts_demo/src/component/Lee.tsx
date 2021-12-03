import React, { Component } from "react";

interface User {
  readonly name: string;
  sex: "male" | "female";
  say(): void;
}

interface IProps {
  name: string;
  age?: number;
  auth?: boolean;
  user?: User;
}

interface Istate {
  count: number;
}

export default class Lee extends Component<IProps, Istate> {
  // constructor(props: IProps) {
  //   super(props);
  //   this.state = {
  //     count: 0,
  //   };
  // }

  state: Istate = {
    count: 0,
  };

  render() {
    const { name, age, user } = this.props;
    user?.say();

    return (
      <div>
        <h2>Lee</h2>
        <div>name: {name}</div>
        <div>age: {age}</div>
        {user?.name && (
          <>
            <div>userName:{user.name}</div>
            <div>userSex:{user.sex}</div>
          </>
        )}
      </div>
    );
  }
}
