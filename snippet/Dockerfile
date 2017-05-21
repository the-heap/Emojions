# Let's pick a version for Node.
FROM node:7.10

# We create an unprivileged user, prosaically called app; avoid running as root
RUN useradd --user-group --create-home --shell /bin/false app

# Set an environment variable for our home folder
ENV HOME=/home/app

# Copy over our package json to the home folder
COPY package.json npm-shrinkwrap.json $HOME/snippet/

# We need to change ownership as files are copied to a root user permission set
RUN chown -R app:app $HOME/*

# For restricting user to just the app folder ?
USER app

# I don't know why this has to exist twice. (snippet/snippet)
# Write now the siblings of `/snippet` are copied over. shouldn't be?
WORKDIR $HOME/snippet/snippet

RUN npm install

CMD ["npm", "run", "example"]
