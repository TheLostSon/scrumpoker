# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:17.0.1-bullseye-slim as builder

RUN mkdir /scrumpoker-websocket
WORKDIR /scrumpoker-websocket

RUN npm install -g @nestjs/cli@10.0.0

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD npm build
CMD ["npm", "start", "--host", "0.0.0.0"]

FROM builder as dev-envs

#RUN <<EOF
#useradd -s /bin/bash -m vscode
#groupadd docker
#usermod -aG docker vscode
#EOF

# install Docker tools (cli, buildx, compose)
#COPY --from=gloursdocker/docker / /

CMD ["npm", "start", "--host", "0.0.0.0"]
