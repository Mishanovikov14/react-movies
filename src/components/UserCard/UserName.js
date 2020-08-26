import React from 'react';
import { UserContext } from '../../App';

const UserName = () => {
    return (
        <UserContext.Consumer>
            {({ name, age }) => (
            <div className="username">
                {name}, {age}
            </div>
            )}
        </UserContext.Consumer>
    );
};

export default UserName;
