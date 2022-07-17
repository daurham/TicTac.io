import openSocket from 'socket.io-client';
import { SOCKET_URL } from './Config';

export const socket = openSocket(SOCKET_URL);