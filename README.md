# <img src="https://s3.amazonaws.com/obvious/logos/M_45_black.png" height=36/>arkium
> A service to convert Medium stories to Markdown

Markium is a web server that takes stories on [Medium](https://medium.com) and converts them to Markdown.

![](images/web.png)

## Installation

- Clone this repository somewhere.
- `npm install` to install dependencies.
- Rename `manifest.example.json` to `mainfest.json` and edit as necessary.
- `./node_modules/hapi/bin/hapi -c manifest.json` to compose and start the server.

## Routes

### `/`
Show the web interface, allowing you to convert and preview individual stories.

### `/{collection}/{id}`
Converts the Medium story to valid Markdown and returns it.

## License (BSD)

Copyright (c) 2014, Fionn Kelleher
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.