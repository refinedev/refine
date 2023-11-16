---
title: gRPC vs REST - A Brief Comparison
description:  We'll explore practical use cases of REST and gRPC to enable you to select the most appropriate API for your project.
slug: grpc-vs-rest
authors: deborah_emeni
tags: [comparison, javascript]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-06-23-grpc-vs-rest/social.png
hide_table_of_contents: false
---



## Introduction
In this modern age, building applications with Application Programming Interfaces (APIs) that are scalable and efficient has greatly benefited businesses, developers, and users. To build an interactive application, you will need an API that enables communication and data exchange among various applications and services.

As a result, frameworks that help create high-performing APIs have been developed in recent years. Some examples of such frameworks include Representational State Transfer ([REST](https://en.wikipedia.org/wiki/Representational_state_transfer#:~:text=Representational%20state%20transfer%20(REST)%20is,as%20the%20Web%2C%20should%20behave.)) and Google Remote Procedure Call ([gRPC](https://grpc.io/)).

This article will teach you about REST APIs and gRPC APIs, including their definitions, functionalities, and distinctions. Additionally, you’ll explore various scenarios that highlight practical use cases of REST and gRPC to enable you to select the most appropriate framework for your project.

Steps we'll cover:
- [gRPC vs REST](#grpc-vs-rest)
  - [Understanding APIs](#understanding-apis)
  - [Explanation of REST APIs](#explanation-of-rest-apis)
  - [How REST APIs work](#how-rest-apis-work)
  - [Explanation of gRPC APIs](#explanation-of-grpc-apis)
  - [How gRPC APIs work](#how-grpc-apis-work)
  - [How the features of REST API differ from gRPC API](#how-the-features-of-rest-api-differ-from-grpc-api)

## Understanding APIs

Developers often need to integrate various services from external sources or exchange data with other applications to build highly functional applications. APIs are crucial in this process by serving as intermediaries between different systems. They define rules or protocols that facilitate communication between services or applications. By utilizing APIs, developers can access and incorporate functionalities from other applications into their own, enabling them to focus on other tasks or functionalities within their application.

Let's look at a simple example that describes APIs and their importance in application development.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-06-23-grpc-vs-rest/illustration.png" alt="grpc-vs-rest" />
</div>

For instance, let's say you are building a book application called BookFinder (that provides information about books) and want to design an API for it.

To enhance the functionality of your application, you decide to integrate it with a book database service by utilizing their API, which you found online. Using their API, you can access functionalities such as retrieving book details like title, description, and author.

Here's what happens: when a user searches for a book in your BookFinder application, you make an API request to the book database service, passing the search query as a parameter. The API then processes the request and returns a response containing the relevant book information.

## Explanation of REST APIs

Representational State Transfer (REST) API is a popular and widely accepted architectural style that provides a set of principles that guide the design of APIs and [microservices](https://microservices.io/). This approach promotes the following:


- **Scalability**: REST APIs use principles such as Statelessness, which refers to a situation where the client request contains all the information needed to process the request on the server. This means that the server can handle requests from multiple clients, ensuring the system can handle increasing traffic which means scalability.


- **Loose Coupling**: REST uses a standard communication protocol called [HTTP](https://en.wikipedia.org/wiki/HTTP) and provides a common interface for the Client and Server components. As the components adhere to the common interface, REST promotes interdependence, meaning that updates or changes made to one component will not affect the others in the system. This process, known as Loose Coupling, promotes modularity and makes it easier to manage the components in the system.

Since REST API is built on HTTP (specifically the [HTTP/1.1](https://www.w3.org/Protocols/rfc2616/rfc2616.html) version) protocol, it utilizes HTTP methods such as GET, POST, PUT, and DELETE to perform operations on resources. Using the architectural style of REST API, a client sends a request to the server using one of these HTTP methods to retrieve resources. The resources on the server are identified or accessed through a [Uniform Resource Locator](https://g.co/kgs/TC4KqJ) (URL). Once the resources are identified, the server sends back responses in a standard format, typically [JSON](https://g.co/kgs/Ph6GfG) (JavaScript Object Notation)

## How REST APIs work

Let's see an example that demonstrates how REST APIs work, using the illustration from the previous section explaining APIs.

Consider a scenario where a user initiates a search for a book titled “Lord of the Rings.” on your **BookFinder** application. The following steps will be carried out:

### Step 1
Your application, also called the Client, will send a request using the HTTP method (**GET)** to the database service containing information about the book. The request will be sent to a specific API endpoint, represented by a URL such as “**/api/books”**, already designed to handle book-related requests.

A query-string format includes the search query as a parameter in the endpoint URL. Here's an example of how your request will look:

```tsx 
  GET /api/books?title=Lord%20of%20the%20Rings HTTP/1.1
  Host: book-database-service.com
```

In the request, the search query parameter has been specified as key-value pairs. The key represents the parameter's name, while the value represents the search query. In this case, the key is 'title,' and the value is 'Lord of the Rings,' which has been included in the request URL. To handle spaces and special characters, the value is [URL-encoded](https://en.wikipedia.org/wiki/URL_encoding) with **%20**. The **Host** indicates the actual server where the API is located.

### Step 2
After receiving the request, the database service's API processes it, extracting the query parameter '**title**' from the URL to determine the book name the user is searching for, such as 'Lord of the Rings'.

### Step 3
Now that the API knows the name of the book the user is searching for, it interacts with the database. The API utilizes search algorithms or queries the database using a Database Query Language like [SQL](https://g.co/kgs/4XJRMt) to find books in the database collection that match the specified title.

Here are the details of the retrieved book:

```tsx
{
  "title": "Lord of the Rings",
  "description": "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil..",
  "author": "J. R. R. Tolkien”
}
```

### Step 4
Since the database service API uses the REST API architectural style, it returns the retrieved details to your BookFinder application in [JSON](https://g.co/kgs/fQaZqZ) format as follows:

```tsx
HTTP/1.1 200 OK
Content-Type: application/json

{
  "title": "Lord of the Rings",
  "description": "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil..",
  "author": "J. R. R. Tolkien
}
```

From the JSON response, you can observe the **HTTP Response** [**Status Cod**](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)[e](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), which indicates the success or failure of the request. A Status Code of **200 OK** signifies a successful request, prompting the return of the book information.

Additionally, take note of the included **Content-Type** header, which provides further information about the response, stating that the response body contains JSON-formatted data.

### Step 5
This is where your BookFinder application receives the HTTP response from the database service's API and extracts the information needed to perform necessary operations or display it to users. 



## Explanation of gRPC APIs

Google Remote Procedure Call ([gRPC](https://grpc.io/)) is a modern framework that provides a standard for software components to communicate with each other in a distributed system. It facilitates the exchange of requests and responses.

gRPC is built on [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call) (Remote Procedure Protocol), which is a high-speed communication model. It leverages [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2), allowing clients to invoke functions from a remote server as if they were local. This capability enables developers to integrate services programmed in different languages.

Since gRPC is built on top of HTTP/2, it has access to certain features that offer the following benefits:


- **High Performance**: gRPC utilizes [Protocol Buffers](https://protobuf.dev/), a data format for serializing structured data, which helps efficiently package and send data. Using the gRPC framework, data is transferred at high-speed thanks to the utilization of the HTTP/2 protocol. This combination of efficiency and speed in data communication leads to high-performance applications. gRPC also ensures high [bidirectional streaming](https://grpc.io/docs/what-is-grpc/core-concepts/#bidirectional-streaming-rpc) performance, allowing simultaneous data transmission between clients and servers.


- **Compatibility and Interoperability**: The language used for defining gRPC APIs is called [Protobufs](https://protobuf.dev/), which offers several benefits in defining services and data. Using Protobufs provides a platform-independent and [language-agnostic](https://g.co/kgs/ypCn7C) way to structure data. With Protobufs, you can write code in different programming languages, and the resulting data will seamlessly communicate with other systems. The platform-independence promotes compatibility and interoperability with other systems.

## How gRPC APIs work

Let's explore the functionality of the gRPC API by using your BookFinder application as an example.

### Step 1
To enable users of your application to search for a book and find the exact one they are looking for, you'll need to begin by creating a protocol buffer file named '**book.proto**'. This file will include the definition of a gRPC service called `BookService` and its methods. One such method you'll need to create is `BookSearch`, which will take a search query as input and return the book details as output.

Here's an example of how your **book.proto** file should be structured:

```tsx
syntax = "proto3";

service BookService {
  rpc BookSearch(BookRequest) returns (BookResponse) {}
}

message BookRequest {
  string search_query = 1;
}

message BookResponse {
  string title = 1;
  string description = 2;
  string author = 3;
}
```

In the code above, the BookService is defined using the protobuf syntax of the [**proto3**](https://protobuf.dev/programming-guides/proto3/) ****version. It includes the `BookSearch` method, which inputs a `BookRequest` message and returns a `BookResponse`. The `BookRequest` message has a single field called `search_query`, which the user provides. The `BookResponse` message has fields for the book's `title`, `description`, and `author`.

### Step 2
After defining your Protocol Buffer file, you need to generate the necessary gRPC code using the [protoc compiler](https://grpc.io/docs/protoc-installation/) with the Node.js plugin (if you're using Node). This will provide you with server and client code to implement and consume the API.

Next, you'll implement the gRPC service methods you created earlier in the **book.proto** file. If you're using [Node.js](https://nodejs.org/), you can utilize a library like [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js), available via npm, to create the server. You can refer to the following sample to implement the server using the protocol buffer definitions:

```tsx
const grpc-js = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Loading the protocol buffer definition
const protoFile = 'book.proto';
const packageDefinition = protoLoader.loadSync(protoFile);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Implementing the gRPC service methods
const BookService = {
  BookSearch: (call, callback) => {
    const searchQuery = call.request.search_query;

    // Querying the book database for the book titled "Lord of the Rings"
    const book = {
      title: 'Lord of the Rings',
      description: 'The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil...',
      author: 'J. R. R. Tolkien',
    };

    // Returning the book information as the response
    callback(null, book);
  },
};

// Creating a new gRPC server
const server = new grpc.Server();

// Adding the BookService implementation to the server
server.addService(protoDescriptor.BookService.service, BookService);

// Starting the server and binding it to a port
const port = 8080;
server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
server.start();
console.log(`gRPC server started on port ${port}`);
```

The code above sets up a gRPC server to listen for incoming requests on port **8080**. When a client sends a request (a search for the 'Lord of the Rings' book) to the `BookSearch` method, the server processes the request and responds with the 'Lord of the Rings' book information.

The [**proto-loader**](https://www.npmjs.com/package/@grpc/proto-loader) module loads and parses the protocol buffer definitions. The **protoFile** specifies the path to the protocol buffer definition file (book.proto). By using **protoLoader.loadSync()**, the contents of the protocol buffer definition file are loaded synchronously, returning a **packageDefinition** object.

The **protoDescriptor** utilizes **grpc.loadPackageDefinition()** to parse the loaded protocol buffer definition and generate code for gRPC communication.

### Step 3
After starting the server, you can generate client code using the same protocol buffer file (book.proto). This client code will provide a client object allowing you to request the server.

On the client side, you can create a gRPC client (client-side code) and use it to send a request to the server's `BookSearch` method.

Here's an example of how this implementation works:

```tsx
const grpc-js = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Loading the protocol buffer definition
const protoFile = 'book.proto';
const packageDefinition = protoLoader.loadSync(protoFile);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Creating a new gRPC client
const client = new protoDescriptor.BookService(
  'localhost:8080',
  grpc.credentials.createInsecure()
);

// Creating a request object
const request = { search_query: 'Lord of the Rings' };

// Sending the request to the server
client.BookSearch(request, (error, response) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  // Handle the response
  console.log('Book Information:');
  console.log('Title:', response.title);
  console.log('Description:', response.description);
  console.log('Author:', response.author);
});
```
The code above creates a new gRPC client using the generated client code. The client is initialized with the server address (localhost:8080) and an insecure credential. A search query is then added to a request object with the field set to 'Lord of the Rings'. Finally, the gRPC client calls the `BookSearch` method, passing the request object and a callback function to handle the response.

## How the features of REST API differ from gRPC API

The architectural style of REST API differs from that of gRPC API due to their distinct features. The table below illustrates the differences:

| **Features**                    | **REST API**                                                                                                                                                       | **gRPC API**                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Message Format**              | It primarily uses JSON, XML, and other text-based formats.                                                                                                         | It uses Protocol Buffers as the format for data.                                                                                                                                  |
| **Caching capabilities**        | It supports caching using HTTP headers like Content-Type, Authorization, Content-Length, and others.                                                               | There is no built-in caching mechanism for gRPC APIs, but external tools or libraries like gRPC client, NGINX, Redis, Memcached, etc., can be used for implementing caching.      |
| **HTTP Protocol**               | It was built on HTTP/1.1, which utilizes HTTP methods (GET, POST, PUT, DELETE).                                                                                    | It transports data over the HTTP/2 protocol, establishing bidirectional communication between the client and the server.                                                          |
| **Generation of Code**          | It facilitates the use of code generation tools and frameworks like OpenAPI and Swagger Codegen, making it easy and efficient to generate code.                    | It uses Protobuf for code generation because it allows efficient and type-safe communication between different programming languages, ensuring interoperability.                  |
| **Integration**                 | Since it's based on HTTP, a widely adopted standard protocol, it is supported by various frameworks like Express.js, Laravel, Ruby on Rails, Django, ASP.NET, etc. | Since Protocol Buffers (protobuf) is a language-agnostic message format, it supports various programming languages including Java, C++, Go, Python, Node.js, Ruby, PHP, and more. |
| **Cross-browser compatibility** | Due to its underlying HTTP protocol, it can be accessed by any browser that supports HTTP. E.g., Google Chrome, Opera, Safari, Mozilla Firefox, etc.               | As gRPC is primarily designed for communication between servers and clients and not tightly coupled to browser-based applications, it is not directly dependent on browsers.      |

## Conclusion

Finally, you've reached the end of the article, where you learned about the architectural style of REST APIs and gRPC APIs, including how they work and the differences between their distinctive features.

## Resources

You may find the following resources useful:

- [gRPC documentation](https://grpc.io/docs/)
- [Protocol Buffers documentation](https://protobuf.dev/overview/)
- [REST APIs](https://www.google.com/search?kgmid=/m/03nsxd&hl=en-NG&q=Representational+state+transfer&kgs=f491d5ba53c53c0c&shndl=0&source=sh/x/kp/1)
- [HTTP/1.1](https://www.w3.org/Protocols/rfc2616/rfc2616.html)
- [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2)