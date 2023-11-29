FROM node:21-bookworm

ARG USERNAME=dev
RUN useradd -m -d /home/$USERNAME -s /bin/bash $USERNAME\
    && apt update \
    && apt upgrade -qqy \
    && apt install -y sudo fish \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    && chsh -s /usr/bin/fish
