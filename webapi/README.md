# Webapi for Healstee project

## Table of content

- [Commands](#commands)
- [API](#api)
  - [User](#user)
  - [Ingredient](#ingredient)
- [FAQ](#faq)

## Commands

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run start`     | start the server                                             |
| `npm run start:dev` | start dev server                                             |
| `npm run db:sync`   | recreate database, database will be empty after this command |
| `npm run db:seed`   | seed the database                                            |
| `npm run docs`      | view the docs for routes                                     |

## Create a new HTML email

We already have all the tools needed to create a new `HTML` email.

1. Go to `src/app/email/views` and make a copy from a current email template.
2. Modify your html code and set your custom variables.
3. You can add new `SASS` style files in `src/app/email/styles`, but don't forget to import in the `index.scss` file.
4. Build your email view using the termial command: `npm run build:email`
5. If you want to see a live version of your template in your browser you can run `npm run build:email:dev`. This command will compile in watch mode and start a server to look at your HTML emails.

## Email Service

Service used system-wide to send html emails to system users.

### Functions

| Name        | Returns            | Description                      |
| :---------- | :----------------- | :------------------------------- |
| `sendEmail` | `<Promise:Number>` | Send email using html templating |

### Parameters

| Params           | Type      | Default | Description |
| :--------------- | :-------- | :------ | :--- |
| `to`             | `string`  | n/a     | Email recipient |
| `subject`        | `string`  | n/a     | Email subject |
| `templateName`   | `string`  | n/a     | Template name that will match the actual view file  |
| `viewParams`     | `object`  | n/a     | This is the data we want to inject into our email view  |
| `regexRendering` | `boolean` | `false` | By default we have Handlebars rendering but for simple stuff we can use regex, so if we want to just inject some variables we should turn this to `true` so it's less cpu heavy |

### Examples

#### Using Handlebars rendering

##### HTML view:

```html
<!-- test-template.hbs -->
<html>
    <body>
        <span>Order number: {{order_number}}</span>
        <span>Order creation date: {{order_creation_date}}</span>

        <ul>
            <!-- Handlebars loop -->
            {{#each itemList}}
                <li>{{this.name}}</li>
            {{/each}}
        </ul>
    </body>
</html>
```

##### Javascript:

```javascript
const emailService = require('../services/email/email.service');

async function testEmail() {

    const checkoutParams = {
        order_number: 123456,
        order_creation_date: 'Jun 15 2019',
        itemList: [
            {
                name: 'Sum item',
            },
            {
                name: 'Sum item2',
            }
        ],
    };

    await emailService.sendEmail({
        to: 'some@email.com',
        subject: 'test subject',
        templateName: 'test-template',
        viewParams: checkoutParams,
    });
}

testEmail();
```

##### Result:

```html
Order number: 123456
Order creation date: Jun 15 2019

- Sum item
- Sum item2
```

In this case we used handlebars rendering because we wanted to use a loop in our email template. But if we just want to inject plain texts in the template we should use `regexRendering = true`.

#### Using Regex rendering

```html
<!-- test-template.hbs -->
<html>
    <body>
        <span>Welcome to Healstee</span>
        <span>Hi {{user_name}}</span>
    </body>
</html>
```

##### Javascript:

```javascript
const emailService = require('../services/email/email.service');

async function testEmail() {

    const checkoutParams = {
        user_name: 'John Nhoj',
    };

    await emailService.sendEmail({
        to: 'some@email.com',
        subject: 'test subject',
        templateName: 'test-template',
        viewParams: checkoutParams,
        regexRendering = true,
    });
}

testEmail();
```

##### Result:

```html
Welcome to Healstee
Hi John Nhoj
```

## API

### User

### Ingredient

## FAQ