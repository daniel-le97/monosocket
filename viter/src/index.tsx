/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import { Router } from "@solidjs/router";
import process from 'socket:process'
import { routes } from './router';
console.log(`Hello, ${process.platform}!`)

const root = document.getElementById('root')

render(() => <Router>{routes}</Router>, root!)
