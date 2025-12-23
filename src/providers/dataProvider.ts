import simpleRestProvider from 'ra-data-simple-rest';
import { httpClient } from '../utils/httpClient';

const API_URL = 'http://localhost:8080/v1';

export const dataProvider = simpleRestProvider(API_URL, httpClient);
