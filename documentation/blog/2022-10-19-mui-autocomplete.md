---
title: A Guide on Material UI AutoComplete in React
description: We'll discover the Material UI (MUI) AutoComplete component with examples
slug: material-ui-autocomplete-component
authors: doro_onome
tags: [material-ui, react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/social.png
hide_table_of_contents: false
---














 

## Introduction
Material UI provides a unique set of components and utilities to help developers have a better creative experience with web applications. One such component is the MUI `<Autocomplete/>` component. This article will dive deep into the **Material UI Autocomplete** component, highlight its accompanied features and explore a potential use case in a real-world application.

Steps we'll cover:
- [What is Material UI?](#what-is-material-ui)
- [Getting Started with MUI Autocomplete](#getting-started-with-mui-autocomplete)
- [MUI Autocomplete props](#mui-autocomplete-props)
  - [RenderInput](#renderinput)
- [GetOptionLabel](#getoptionlabel)
- [GetOptionSelected](#getoptionselected)
  - [Free solo](#free-solo)
  - [GroupBy](#groupby)
- [MUI Autocomplete features](#mui-autocomplete-features)
  - [MUI Autocomplete State Management](#mui-autocomplete-state-management)
  - [The useAutocomplete Hook](#the-useautocomplete-hook)
  - [Asynchronous Requests](#asynchronous-requests)
  - [Multiple Values](#multiple-values)
  - [Fixed Options](#fixed-options)
  - [Checkboxes](#checkboxes)
- [Cloning Google’s Home Page UI with Material UI Autocomplete](#cloning-googles-home-page-ui-with-material-ui-autocomplete)
- [MUI Autocomplete Limitations](#mui-autocomplete-limitations)
  - [autocomplete/autofill](#autocompleteautofill)

## What is Material UI?
Developed in 2014, Material UI is a React framework that provides adequate tools(components and utilities) to create a web application. MUI enables the use of various customisable components to create a UI for a company's web and mobile apps. Many developers now use Material UI to structure their projects because it makes web design more straightforward and effective.

Material UI offers several component categories, including Navigations components, Input components, Data Display components, Feedback components, e.t.c. The **Material UI Autocomplete** component is a prime example of the Input components.

You can install Material UI into your React project with:

npm `npm install @mui/material @emotion/react @emotion/styled`

yarn: `yarn add @mui/material @emotion/react @emotion/styled`

## Getting Started with MUI Autocomplete
The Material UI `<Autocomplete />` component can be identified as an improved React text input that includes several suggested options for better optimisation. It is an enhanced version of `react-select` or `downshift` packages.

The `<Autocomplete />` component is best used for modifying single-line textbox values to accommodate more options. The component’s `value` is obtained from a predetermined range of acceptable values/options.

Here’s how to structure your option values:

```tsx
interface AutocompleteOption {
  label: string;
}
// or
type AutocompleteOption = string;
```

Below is a simple illustration of **MUI Autocomplete** in play:

```tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Top 5 Nigerian songs on Apple Music 
const top5Songs = [
  { label: 'Organise'},
  { label: 'Joha'},
  { label: 'Terminator'},
  { label: 'Dull'},
  { label: 'Nzaza'},
];

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top5Songs}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Songs" />}
    />
  );
}

```

The code above showcases an input text field that displays 5 songs as predefined option values.



<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/image1.png"  alt="MUI useAutoComplete" />
</div>

## MUI Autocomplete props

### RenderInput
The `renderInput` prop allows you to customise the rendered input to display the option values in whatever form you please.

Consider the code below:

```tsx
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Option 1', 'Option 2'];

export default function CustomInputAutocomplete() {
  return (
    <label>
      Value:{' '}
      <Autocomplete
        sx={{
          width: 200
        }}
        id="custom-input-demo"
        options={options}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} />
          </div>
        )}
      />
    </label>
  );
}
```

The code above illustrates the use of the `renderInput` prop. Take special note of the `ref` and `inputProps` keys.

Here’s the result:


<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/renderInput.gif"  alt="MUI useAutoComplete renderInput" />
</div>


## GetOptionLabel
`getOptionLabel` is used to display the text in the dropdown menu.

```tsx
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
]


<Autocomplete
  id="combo-box-demo"
  options={top5Songs}
  getOptionLabel={(option) => option.year.toString()} // this displays a dropdown that uses option.title to show the title of the songs as option values. 
......

```

## GetOptionSelected
The `getOptionSelected` is used to determine the selected value of a specified array.

```tsx
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
]

<Autocomplete
  id="combo-box-demo"
  options={top5Songs)
  getOptionSelected={(option) => option.title === 'dull'}
....
//this will select all the option with the song title 'dull' and make the background of that option darker

```

Other Material UI Autocomplete props include:

### Free solo
When you add the `freeSolo` prop to the `<Autocomplete />` component, it enables the text field to accept undetermined values. The prop's primary purpose is to provide suggestions for a search `input` like Google search does.

Here’s a simple illustration:

```tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


// Top 5 Nigerian songs on Apple Music 
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
];


export default function FreeSolo() {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        // calling the freeSolo prop inside the Autocomplete component
        freeSolo
        options={top5Songs.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />

    </Stack>
  );
}
```

Here’s the result:

<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/free-solo.gif"  alt="MUI useAutoComplete freeSolo" />
</div>



### GroupBy
You can sort the MUI Autocomplete options with the `groupBy` prop. To do this, you must ensure that the values are sorted systematically in the same dimension as they are grouped to avoid duplicate headers.

Here’s what I mean:

```tsx
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const movies = [
  // An array of movie objects with ‘title’ as the key and the movie name as the value. 
];

export default function Grouped() {
  const options = movies.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Grouped Options" />}
    />
  );
}
```

The code above illustrates the use of the `groupBy` prop in the `<Autocomplete/>`. It groups an array containing 100 movies, displays them alphabetically and highlights the first letter of the movie title when scrolling through. 

Here’s the result:

<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/groupby.gif"  alt="MUI useAutoComplete groupby" />
</div>







---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---

## MUI Autocomplete features

### MUI Autocomplete State Management
The `Autocomplete` component has two manageable states:

The `value` state represents the value chosen by the user by clicking or pressing “Enter.”
The `input` value represents the value displayed in the textbox. 

Study the code below:

```tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = ['Value 1', 'Value 2'];

// Creating the manageable states
export default function ManageableStates() {
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      {/* displaying the state values with template literals */}
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />

      {/* Calling the Autocomplete component and updating its state features */}
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="manageable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Manage State" />}
      />
    </div>
  );
}
```

The code showcases how the values of the `AutoComplete` component can be controlled and altered in state.

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/state-management.gif"  alt="MUI useAutoComplete statemanagement" />
</div>



### The useAutocomplete Hook
Material UI Autocomplete comes with a headless `useAutocomplete` hook which can serve as an alternative search input to the `<Autocomplete />` component. It accepts nearly the same option props as the Autocomplete component without the ones about DOM rendering.

You can import this hook into your React project like this:

```tsx
import useAutocomplete from '@mui/material/useAutocomplete';
```

Consider the code below:

```tsx
import * as React from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/system';

// Styling the <Label /> component
const Label = styled('label')({
  display: 'block',
});

// Styling the Input component
const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  color: theme.palette.mode === 'light' ? '#000' : '#fff',
}));

// Styling the <Listbox /> component
const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#000',
  border: '1px solid rgba(0,0,0,.5)',
  '& li.Mui-focused': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { label: 'Organise'},
  { label: 'Joha'},
  { label: 'Terminator'},
  { label: 'Dull'},
  { label: 'Nzaza'},
];

// Using the useAutocomplete hook to set up the songs as search options. 
export default function UseAutocomplete() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: top5Songs,
    getOptionLabel: (option) => option.label,
  });

  // Rendering our parameters on the DOM
  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>useAutocomplete</Label>
        <Input {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {(groupedOptions as typeof top5Songs).map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.label}</li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}

```

The code above showcases a simple use case for the `useAutocomplete` hook. It helps display songs in an array as search options without using the `<Autocomplete />` component.

Here’s the result:

<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/useAutoComplete.gif"  alt="MUI useAutoComplete" />
</div>




### Asynchronous Requests
The `<Autocomplete />` component can display search input options with two different asynchronous requests:

Load on open: It waits until the component is interacted with before loading the options. It displays a progress bar when your local network is pending/loading
Search as you type: Each keystroke generates a new request.. 

Consider the code below:

```tsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Setting the delay function
function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
];

// managing state
export default function Asynchronous() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Film[]>([]);
  const loading = open && options.length === 0;

  // Setting the logic for the asynchronous function on page reload
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...top5Songs]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Rendering our parameters on the DOM
  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
```

The code above showcases an asynchronous DOM display of the MUI Autocomplete component illustrating the “Load on open” feature.
 


<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/async.gif"  alt="MUI useAutoComplete async" />
</div>

### Multiple Values
MUI Autocomplete also provides a feature for users to select more than one value. You can do that by calling the `multiple` prop inside the `<Autocomplete />` component. You can also set a default option value like this:

```tsx
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
];

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={top5Songs}
        getOptionLabel={(option) => option.title}
        defaultValue={[top5Songs[2]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
    </Stack>
  );
}
``` 

Here’s the result:

<div className="centered-image"  >
   <img style={{alignSelf:"center", width:"300px"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/multiplevalues.gif"  alt="MUI useAutoComplete multiplevalues" />
</div>











### Fixed Options
In a scenario where you want a fixed default tag that cannot be deleted or removed you can set the chips `disabled`.

Here’s how:

```tsx
import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const movies = [
  // An array of movie objects with ‘title’ as the key and the movie name as the value. 
];

export default function FixedTags() {
  const fixedOptions = [movies[6]];
  const [value, setValue] = useState([...fixedOptions, movies[13]]);

  return (
    <Autocomplete
      multiple
      id="fixed-options-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...fixedOptions,
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
      }}
      options={movies}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option.title}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Fixed tag" placeholder="Movies" />
      )}
    />
  );
}
```

The code above illustrates how you can set a fixed default value on the `<AutoComplete` component that cannot be deleted or removed. 

Here’s the result:



<div className="centered-image"  >
   <img style={{alignSelf:"center", }}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/fixedoptions.gif"  alt="MUI useAutoComplete fixedoptions" />
</div>



### Checkboxes
When using the MUI `<Autocomplete` component, you can choose to use checkboxes as search input option values. This helps you choose your options definitively and makes for a better user experience. 

Consider the code below:

```tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Top 5 Nigerian songs on Apple Music
const top5Songs = [
  { title: 'Organise'},
  { title: 'Joha'},
  { title: 'Terminator'},
  { title: 'Dull'},
  { title: 'Nzaza'},
];

export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={top5Songs}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Checkboxes" />
      )}
    />
  );
}
```
<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/checkbox.gif"  alt="MUI useAutoComplete checkbox" />
</div>



## Cloning Google’s Home Page UI with Material UI Autocomplete
The majority of products incorporate search inputs into various elements of their web applications. Google's Home page layout illustrates how search inputs might be used in typical real-world application. For the sake of this tutorial, we will use React and **MUI Autocomplete** to replicate Google's home page layout.

Here’s the code:

```tsx
import React from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import AppsIcon from '@mui/icons-material/Apps';




// Top 5 Nigerian songs on Apple Music 
const top5Songs = [
    { title: 'Organise'},
    { title: 'Joha'},
    { title: 'Terminator'},
    { title: 'Dull'},
    { title: 'Nzaza'},
  ];

const Home = () => {

  const style = {
    root: {
      width: 600,
      color: '#fff',
      marginLeft: '25em',
    },
  } 
  return (
    <>
    <main>
    <Stack spacing={2} sx={{ width: 300 }}>
      <nav>
        <p>Gmail</p>
        <p>Images</p>
        <AppsIcon />
        <div>
          <img src="https://refine.ams3.cdn.digitaloceanspaces.comage from " />
        </div>
      </nav>

      <div id='logo-div'>
        <img src="https://refine.ams3.cdn.digitaloceanspaces.comgo from " />
      </div>

      <div id='autocomplete-div'>
      <Autocomplete
        id='auto-complete'
        freeSolo
        options={top5Songs.map((option) => option.title)}
        style={style.root}
        inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      </div>

<article>
      <div className='below-input'>Google Search</div>
      <div className='below-input'>I'm feeling Lucky</div>
      </article>

      <footer className='footer'>
          <div className='aside1'>
            <p>About</p>
            <p>Advertising</p>
            <p>Business</p>
            <p>How Search works</p>
          </div>

          <div className='aside2'>
          <img src="some image" alt="" data-atf="1" data-frt="0"></img>
          <p>Carbon Neutral since 2007</p>
          </div>

          <div className='aside3'>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Settings</p>
          </div>
      </footer>

    </Stack>
    </main>
    </>
  )
}

export default Home
```

Here’s the result:

<div className="centered-image"  >
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-10-19-mui-autocomplete/google.gif"  alt="MUI useAutoComplete google" />
</div>

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


## MUI Autocomplete Limitations

### autocomplete/autofill
Heuristics are built into browsers to assist users in filling out form inputs, but tend to hurt the component's UX. With the `autoComplete="off"` attribute, the component disables the input `autocomplete` feature (remembering what the user wrote for a specific field in a previous session). One possible fix is removing the id and letting the component generate one randomly.

In addition to remembering previously entered information, the browser may make autofill suggestions (saved login, address, or username). If you wish to avoid autofill, you can attempt the following:
Name the input without revealing any information that the browser can utilise. id="field1" instead of id="country" If you leave the id field empty, the component generates a random id.
Set `autoComplete="new-password"`. Some browsers will recommend a secure password for inputs with this attribute set.


## Conclusion
In this article, we discussed the **Material UI Autocomplete** component, its 'option' props, functionalities and variations. We then moved on to clone Google's Home page using the Autocomplete component. . Despite its limitations, MUI Autocomplete assists developers in generating a responsive and interactive search input for any web interface. I hope you find this post useful. 

