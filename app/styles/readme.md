# Styles Guidelines

## Architecture

Architecting a CSS project is probably one of the most difficult things you will have to do in a project’s life.
Keeping the architecture consistent and meaningful is even harder.
~ from [Sass Guidelines](https://sass-guidelin.es/#architecture)

This project uses a mixture of ITCSS, BEM and [Suit CSS](https://suitcss.github.io/).

### Folder/File Structure

Folder/File structure follows ITCSS, and everything else its a mixture of BEM and Suit CSS.

```
.
├── /styles/
│   ├── /settings/    # Preprocessor variables and methods (no actual CSS output)
│   ├── /tools/       # Mixins and functions (no actual CSS output)
│   ├── /generic/     # CSS resets which might include Normalize.css, or your own batch of code
│   ├── /elements/    # Single HTML element selectors without classes
│   ├── /objects/     # Classes for page structure typically following the OOCSS methodology
│   ├── /components/  # Aesthetic classes for styling any & all page elements
│   ├── /utilities/   # Mixins, functions used throught the entire project
│   ├── /trumps/      # The most specific styles for overriding anything else in the triangle
```

| Folder     | Description |
| ---------- | ----------- |
| Settings   | Used with preprocessors and contain font, colors definitions, etc. |
| Tools      | Globally used mixins and functions. It’s important not to output any CSS in the first 2 layers. |
| Generic    | Reset and/or normalize styles, box-sizing definition, etc. This is the first layer which generates actual CSS. |
| Elements   | Styling for bare HTML elements (like H1, A, etc.). These come with default styling from the browser so we can redefine them here. |
| Objects    | Class-based selectors which define undecorated design patterns, for example media object known from OOCSS   |
| Components | Aesthetic classes for styling any & all page elements. This is where majority of our work takes place and our UI components are often composed of Objects and Components |
| Utilities  | Mixins, functions used throught the entire project |
| Trumps     | Utilities and helper classes with ability to override anything which goes before in the triangle, eg. hide helper class |

## BEM & Suit CSS Naming Conventions

```css
/* block */
.Photo {}

/* element */
.Photo__img {}

/* modifier */
.Photo--large {}
```

## Syntax & Formatting

Most of these rules are blunt copies of [Sass Guidelines](https://sass-guidelin.es/) rules, so read those first. Bellow are just a few more important ones with some changes.

Roughly, we want (shamelessly inspired by CSS Guidelines):

* one (1) tab indents , no spaces;
* ideally, 80-characters wide lines;
* properly written multi-line CSS rules;
* meaningful use of whitespace.

```css
// Yep
.foo {
	display: block;
	overflow: hidden;
	padding: 0 1em;
}

// Nope
.foo {
  display: block; overflow: hidden;

  padding: 0 1em;
}
```

### Numbers

In Sass, number is a data type including everything from unitless numbers to lengths, durations, frequencies, angles and so on. This allows calculations to be run on such measures.

#### ZEROS

Numbers should display leading zeros before a decimal value less than one. Never display trailing zeros.

```css
// Yep
.foo {
	padding: 2em;
	opacity: 0.5;
}

// Nope
.foo {
	padding: 2.0em;
	opacity: .5;
}
```

#### UNITS

When dealing with lengths, a 0 value should never ever have a unit.

```scss
// Yep
$length: 0;

// Nope
$length: 0em;
```

####CALCULATIONS

Top-level numeric calculations should always be wrapped in parentheses. Not only does this requirement dramatically improve readability, it also prevents some edge cases by forcing Sass to evaluate the contents of the parentheses.

```css
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

#### MAGIC NUMBERS

“Magic number” is an [old school programming](http://en.wikipedia.org/wiki/Magic_number_(programming)#Unnamed_numerical_constants) term for unnamed numerical constant. Basically, it’s just a random number that happens to just work™ yet is not tied to any logical explanation.

Needless to say magic numbers are a plague and should be avoided at all costs. When you cannot manage to find a reasonable explanation for why a number works, add an extensive comment explaining how you got there and why you think it works. Admitting you don’t know why something works is still more helpful to the next developer than them having to figure out what’s going on from scratch.

```css
/**
 * 1. Magic number. This value is the lowest I could find to align the top of
 * `.foo` with its parent. Ideally, we should fix it properly.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

On topic, CSS-Tricks has a [terrific article](http://css-tricks.com/magic-numbers-in-css/) about magic numbers in CSS that I encourage you to read.
