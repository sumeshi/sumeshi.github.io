FROM node:18-bullseye

ARG USERNAME=dev
RUN useradd -m -d /home/$USERNAME -s /bin/bash $USERNAME\
    && apt update \
    && apt install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
    && chmod 0440 /etc/sudoers.d/$USERNAME
