import { Component, ReactElement } from 'react';

interface User {
  readonly name: string;
  sex: 'male' | 'female';
  say(): void;
}

export interface IProps {
  name: string;
  age?: number;
  user?: User;
  auth?: boolean;
};

interface Istate {
  count: number;
}

class Lee extends Component<IProps, Istate> {
  // constructor(props: IProps) {
  //   super(props);
  //   this.state = {
  //     count: 0,
  //   };
  // }

  state: Istate = {
    // eslint-disable-next-line react/no-unused-state
    count: 0,
  };

  render(): ReactElement {
    const { name, age, user } = this.props;
    user?.say();

    return (
      <div>
        <h2>Lee</h2>
        <div>
          name:
          {name}
        </div>
        <div>
          age:
          {age}
        </div>
        {user?.name && (
          <>
            <div>
              userName:
              {user.name}
            </div>
            <div>
              userSex:
              {user.sex}
            </div>
          </>
        )}
      </div>
    );
  }
}


export default Lee