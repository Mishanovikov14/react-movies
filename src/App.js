import React, {Component, createRef, createContext} from 'react';

// import Card from './components/Card/Card';
// import Title from './components/Title/Title';
// import Input from './components/Input/Input';
// import View from './components/View';
// import Wrapper from './Hoc/Wrapper';
// import Office from './Hoc/Office';
// import UserName from './components/UserCard/UserName';
import UserCard from './components/UserCard/UserCard';

import './App.css';

const USER_CARDS = [
    {
        id: 1,
        fullName: 'Astrent Bear',
        yearOfBirth: 1950

    },
    {
        id: 2,
        fullName: 'Mike Smith',
        yearOfBirth: 1970

    },
    {
        id: 3,
        fullName: 'Nik Doe',
        yearOfBirth: 1990

    }
];

export const UserContext = createContext({
    name: '',
    age: 0
}); 

class App  extends Component {
    state = {
        users: USER_CARDS,
        showMessage: false,
        login: '',
        password:''
    }

    passwirdRef = createRef();
    
    handleToggleMessage = () => {

        this.setState(prevState => ({
            showMessage: !prevState.showMessage
        }), () => {
            console.log('Updated!');
        });
    }

    handleDeleteCard = id => {
        const { users } = this.state;

        this.setState({
            users: users.filter(user => user.id !== id)
        });
    } 
    
    handleInputChange = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    
    render() {
        // const { users, showMessage, login, password } = this.state;

        const user = {
            name: 'John',
            age: 23
        };

        return (
            <div className="app">
                <UserContext.Provider value={user}>
                    <UserCard />
                </UserContext.Provider>
                {/* {showMessage ? <h1>Hello World</h1> : null }

                <button onClick={this.handleToggleMessage}>Show message</button>

                <Office>
                    {({ data, onClick}) => (
                        <View data={data} onClick={onClick} />
                    )}
                </Office>

                <form autoComplete="off">
                    <Input
                        name="login" 
                        placeholder="Login"
                        value={login}
                        onChange={this.handleInputChange}
                    />

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={this.handleInputChange}
                    />

                    <button>Submit</button>
                </form>

                {users.map(({ id, yearOfBirth, fullName }) => (
                    <Wrapper key={id}>
                        <h1>Hello</h1>

                        <Card
                            yearOfBirth={yearOfBirth}
                            onDelete={() => this.handleDeleteCard(id)}
                        >
                            <Title className="app__title">{fullName}</Title>
                        </Card>
                    </Wrapper> 
                ))} */}
            </div>
       );
    }
}

const fibonacci = num => {
    const result = [0, 1];

    for (let i = 2; i <= num; i++) {

        const num1 = result[i - 1];
        const num2 = result[i - 2];

        result.push(num1 + num2);
    }
    return result[num];
  }

  console.log(fibonacci(5));

  

// const App = () => {
//     const handelClickId = userId => {
//         console.log(`User ID: ${userId}`);
//     };      

//     return (
//         <div className="app">
//             {USER_CARDS.map(({ id, yearOfBirth, fullName }) => (
//                 <Card 
//                     key={id}
//                     yearOfBirth={yearOfBirth}
//                     onClick={() => handelClickId(id)}
//                 >
//                     <Title className="app__title">{fullName}</Title>
//                 </Card>
//             ))}
//         </div>
//    );
// };

export default App;
