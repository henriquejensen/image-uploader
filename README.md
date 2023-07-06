# Image uploader

[Layout](https://www.figma.com/file/NxbZm3CAovYh89dFXe7EOw/Image-Uploader?node-id=0%3A1&mode=dev)

## Description

This is a simple image uploader that allows you to upload images to a server. It uses the [Multer](https://www.npmjs.com/package/multer) package to handle the file upload. The uploaded images are stored in an AWS S3 bucket.

## Running the project locally

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running the project in production

1. Clone the repository
2. Create a `.env` file in the root directory of the project, similar to the `.env.example` file
3. Adds the AWS credentials to the `.env` file
4. Run `npm install`
5. Run `npm run build`
6. Run `npm run start`
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Click on the "Choose file" button
2. Select an image from your computer
3. Click on the "Upload" button

## Technologies

- Next.js
- Multer
- Tailwind CSS
- AWS S3

## Mock

![Mock](./mock.gif)
