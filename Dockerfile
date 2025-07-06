FROM node:18

WORKDIR /app

COPY package.json package-lock.json prisma ./

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]