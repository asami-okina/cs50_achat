FROM rust:latest

WORKDIR /app

RUN cargo install diesel_cli --no-default-features --features mysql
RUN cargo install cargo-watch
