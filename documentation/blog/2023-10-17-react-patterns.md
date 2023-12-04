---
title: React Design Patterns
description: We'll explore React design patterns and examine how they might improve the development of React applications.
slug: react-design-patterns
authors: peter_osah
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-10-17-react-patterns/social.png
hide_table_of_contents: false
---


## Introduction:
React developers can save time and effort by using design patterns, which provide a quick approach to addressing problems using tested-and-trusted solutions. They enable cohesive modules with lower coupling, which in turn helps React developers create maintainable, scalable, and efficient applications. In this article, we will explore React design patterns and examine how they might improve the development of React applications.

Steps we'll cover

  - [Container and presentation patterns](#container-and-presentation-patterns)
  - [Component composition with Hooks](#component-composition-with-hooks)
  - [State management with Reducers](#state-management-with-reducers)
  - [Data management with Providers](#data-management-with-providers)
  - [Component enhancement with HOCs (higher-order components)](#component-enhancement-with-hocs-higher-order-components)
  - [Compound Components](#compound-components)
  - [Prop combination](#prop-combination)
  - [Controlled inputs](#controlled-inputs)
  - [Manage custom components with forwardRefs](#manage-custom-components-with-fowardrefs)

## Container and presentation patterns
The Container and presentation pattern is a pattern that aims to separate the presentation logic from the business logic in a react code, thereby making it modular, testable, and one that follows the separations of concern principle.
Mostly in react applications, there arise cases where we are required to fetch data from a backend/store or to compute a logic and represent the resultant of that computation on a react component. In these cases, the container and presentation pattern shines as it can be used to categorize the components into two namely:
* The container component, which acts as the component responsible for the data fetching or computation.
* the presentation component, whose job is to render the fetched data or computed value on the UI(user interface).

An example of Container and presentation pattern is shown below:

```tsx
import React, { useEffect } from 'react';
import CharacterList from './CharacterList';

const StarWarsCharactersContainer:React.FC = () => {
    const [characters, setCharacters] = useState<Character>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const getCharacters = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://akabab.github.io/starwars-api/api/all.json");
            const data = await response.json();
            setIsLoading(false);
            if (!data) return;
            setCharacters(data);
        } catch(err) {
            setError(true);
        } finally {
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getCharacters();
    }, []);

    return <CharacterList loading={loading} error={error} characters={characters} />;
};

export default StarWarsCharactersContainer;
```





```tsx
// the component is responsible for displaying the characters

import React from 'react';
import { Character } from './types';

interface CharacterListProps {
    loading: boolean;
    error: boolean;
    users: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ loading, error, characters }) => {
    
    if (loading && !error) return <div>Loading...</div>;
    if (!loading && error) return <div>error occurred.unable to load characters</div>;
    if (!characters) return null;

    return (
        <ul>
            {characters.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};

export default CharacterList;
```



## Component composition with Hooks
Hooks are a brand-new feature that debuted in React 16.8. Since then, they have played a crucial role in developing react applications. Hooks are basic functions that grant functional components access to state and lifecycle methods (which were previously exclusively available to class components). Hooks, on the other hand, can be specifically designed to meet a component requirement and have additional use cases.

We can now isolate all stateful logic—a type of logic that needs reactive state variable(s)—and compose or use it in the components using custom hooks. As a result, the code is more modularized and testable because the hooks are loosely tied to the component and can therefore be tested separately.

An example of component composition with hooks is shown below:



```tsx
// creating a custom hook that fetches star wars characters

export const useFetchStarWarsCharacters = () => {

    const [characters, setCharacters] = useState<Character>([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const controller = new AbortController()

    const getCharacters = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://akabab.github.io/starwars-api/api/all.json", 
                {
                    method: "GET", 
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    signal: controller.signal
                }
            );
            const data = await response.json();
            setIsLoading(false);
            if (!data) return;
            setCharacters(data);
        } catch(err) {
            setError(true);
        } finally {
            setIsLoading(true);
        }
    };

    useEffect(() => {
        getCharacters();
        return () => {
            controller.abort();
        }
    }, []);

    return [
        characters,
        isLoading,
        error
    ];
};
```


After creating the custom hook, we will import it into our **StarWarsCharactersContainer** component and use it;


```tsx
// importing the custom hook to a component and fetch the characters 

import React from 'react';
import { Character } from './types';
import { useFetchStarWarsCharacters } from './useFetchStarWarsCharacters';

const StarWarsCharactersContainer:React.FC = () => {

    const [ characters, isLoading, error ] = useFetchStarWarsCharacters();

    return <CharacterList loading={loading} error={error} characters={characters} />;
};

export default StarWarsCharactersContainer;

```



## State management with Reducers

Most often, handling many states in a component leads to issues with many ungrouped states, which can be burdensome and challenging to handle. The reducer pattern can be a helpful option in this situation. We can categorize states using reducers into certain actions that, when executed, can change the grouped states. 

This pattern allows the developer who uses it to control the component's and/or hook's state management, letting them manage state changes when events are sent.

An example of using the reducer pattern is shown below:

```tsx
import React, { useReducer } from 'react';

const initState = {
    loggedIn: false,
    user: null,
    token: null
}

function authReducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                loggedIn: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case 'logout':
            return initState;
        default:
            break;
    }
}

const AuthComponent = () => {
    const [state, dispatch] = useReducer(authReducer, initState);

    const logIn = () => {
        dispatch({ type: 'login', payload: { 
            user: { name: 'John Doe'},
            token: 'token' 
        } });
    }

    const logOut = () => {
        dispatch({ type: 'logout' });
    }

    return (
        <div>
            { state.loggedIn ? (
                    <div>
                        <p> Welcome { state.user.name } </p>
                        <button onClick={logOut}></button>
                    </div>
                ): (
                    <form onSubmit={logIn}>
                        <input type="text" />
                        <input type="password" />
                        <button type="submit"></button>
                    </form>
                )
            }
        </div>
    )
};
```

In the above code, the component dispatches two actions:

* The '**login**' action type triggers a state change that affects three state values namely **loggedIn**, **user**, **token**. 
* The '**logout**' action simply resets the state to its initial value.


## Data management with Providers

The provider pattern is very useful for data management as it utilizes the context API to pass data through the application's component tree. This pattern is an effective solution to prop drilling, which has been a common concern in react development.


To implement the provider pattern, we will first create a Provider Component. A Provider is a higher-order component that the Context object provides to us. We can construct a Context object by utilizing the createContext method provided by React.

```tsx
export const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```


After creating the provider, we will enclose components dependent on the data from context API with the created Provider Component.

To obtain the data from context API, we call useContext hook, which accepts a context as a parameter(in this case, **ThemeContext**). 

```tsx
impor { useContext } from 'react';
import { ThemeProvider, ThemeContext } from "../context";


const HeaderSection = () => {
  <ThemeProvider>
    <TopNav />
  </ThemeProvider>;
};


const TopNav = () => {
  const { theme, setTheme } = useContext(ThemeContext);
    
  return (
    <div style={{ backgroundColor: theme === "light" ? "#fff" : "#000 " }}>
      ...
    </div>
  );
};

```


## Component enhancement with HOCs (higher-order components)

A higher-order component takes in a component as an argument and returns a supercharged component injected with additional data or functionality. The possibility of HOCs in React is due to React preference of composition over inheritance.

The Higher-Order Component (HOC) pattern offers a mechanism to increase or modify a component's functionality, facilitating component reuse and code sharing.

An example of the HOC pattern is shown below:


```tsx
import React from 'react'

const higherOrderComponent = Component => {
  return class HOC extends React.Component {
    state = {
      name: 'John Doe'
    }
     
    render() {
      return <Component name={this.state.name {...this.props} />
    }
 }
  
  
const AvatarComponent = (props) => {
  return (
    <div class="flex items-center justify-between">
      <div class="rounded-full bg-red p-4">
          {props.name}
      </div>
      <div>
          <p>I am a {props.description}.</p>
      </div>
    </div>
  )
}
      
      
const SampleHOC = higherOrderComponent(AvatarComponent);


const App = () => {
  return (
    <div>
      <SampleHOC description="Frontend Engineer" />
    </div>
  )
}

export default App;
```

In the code above, the **<AvatarComponent/>** is supplied props by the **higherOrderComponent**, which it will utilize internally.


## Compound Components

The Compound Components Pattern is a React design pattern for managing parent components that are made up of child components. 

The principle behind this pattern is to break down the parent component into smaller components and then manage the interactions between these smaller components with either props, context or other react data management techniques.

This pattern comes in handy when there is a need to create reusable, versatile components made up of smaller components. It enables developers to create sophisticated UI components that can be readily customized and extended while maintaining a clear and simple code structure.

An example of a use case of the compound components pattern is shown below:

```tsx
import React, { createContext, useState } from 'react';

const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
}

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
}

Toggle.Button = function ToggleButton(props) {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle} {...props} />;
}

function App() {
  return (
    <Toggle>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button>Toggle</Toggle.Button>
    </Toggle>
  );
}
```


## Prop combination 
This entails creating a single object out of several related props and passing it as a single prop to the component.

This pattern allows us to clean up our code and make it simpler to manage the props, making it especially helpful when we want to pass a lot of related properties to a component.



```tsx
import React from 'react';

function P(props) {
  const { color, size, children, ...rest } = props;
  return (
    <p style={{ color, fontSize: size }} {...rest}>
      { children }
    </p>
  );
}

function App() {
  const paragraphProps = {
    color: "red",
    size: "20px",
    lineHeight: "22px"
  };
  return <P {...paragraphProps}>This is a P</P>;
}
```


## Controlled inputs
The Controlled Input pattern can be used to handle input fields. This pattern involves using an event handler to update the component state if the value of an input field changes, as well as storing the current value of the input field in the component state.

Because React controls the state and behavior of the component, this pattern makes code more predictable and readable than the uncontrolled inputs pattern, which does not use the component's state and instead controls it directly through the DOM (Document object model).


An example of a use case of a controlled inputs pattern is shown below:

```tsx
import React, { useState } from 'react';

function ControlledInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input type="text" value={inputValue} onChange={handleChange} />
  );
}
```


## Manage custom components with forwardRefs

A higher-order component called a ForwardRef takes another component as input and outputs a new component that passes the original component's ref. By doing this, the child component's ref, which can be used to retrieve the underlying DOM node or component instance, is made accessible to the parent component.

When creating a custom component that interacts with a third-party library or another custom component within your application, it is highly helpful to include the ForwardRef pattern in your workflow. By granting access to the library's DOM node or another component's DOM instance, it helps transfer control of such components to you.

An example of a use case of the forwardRef pattern is shown below:

```tsx
import React from "react";
 
const CustomInput = React.forwardRef((props, ref) => (
  <input type="text" {...props} ref={ref} />
));
 
const ParentComponent = () => {
  const inputRef = useRef(null);
 
  useEffect(() => {
    inputRef.current.focus();
  }, []);
 
  return <CustomInput ref={inputRef} />;
};
```

In the code above, we triggered the focus of another component `<CustomInput/>` from our component `<ParentComponent/>` using `forwardRefs`.


# Conclusion

We discussed React design patterns in this article, including Higher-Order Components, Container-Presentational Component Patterns, Compound Components, Controlled Components, and many more. You can enhance code quality, promote team collaboration, and make your apps more scalable, flexible, and maintainable by incorporating these design patterns and best practices into your React projects.