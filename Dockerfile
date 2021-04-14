FROM hayd/alpine-deno:1.8.3

WORKDIR /app

COPY . .

# user with permission to run command, has to be deno
USER deno

CMD ["run", "--allow-net", "--allow-read", "mod.ts"]

EXPOSE 8002