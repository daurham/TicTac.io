import openSocket from 'socket.io-client';
import { SOCKET_URL } from '../client/src/Config';

export const socket = openSocket(SOCKET_URL);