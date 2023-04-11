[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# What is it?

This is a fullstack application for dev.vk.com, using my other repository vk-fortune-wheel-backend as the server.

The app is a wheel of fortune where each VK user has his own balance, one spin costs 100 coins, you might be the one to hit the jackpot! Huh, it's actually a win-win, since it's unlikely you'll get a prize of 10 coins 11 times in a row :)

Features:
- Real-time updating of the winner's list via web sockets
- Nice button animations 🕹
- All winning logic happens on the server, which prevents any cheating on the front end, and the wheel stops where the server says

## How to use on local

1) git clone https://github.com/conterkote/vk-fortune-wheel-frontend.git
2) cmd "npm i"
3) cmd "tsc -p ."
4) cmd "npm start"

Inside App.tsx set variable "const dev = true"

## How test it into VK

If you want to test it in VK, go to the link:
https://dev.vk.com/mini-apps/getting-started

And do the section "Running a mini-app inside VKontakte"

Inside App.tsx set variable "const dev = false"

Use "npm run tunnel"
