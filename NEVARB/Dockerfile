FROM ruby:2.6.3-alpine3.9
RUN apk update && apk add bash

COPY ./play.rb /root/

WORKDIR /root/

CMD ruby play.rb