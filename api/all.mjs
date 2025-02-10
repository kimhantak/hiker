import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import { createClient } from '@supabase/supabase-js';
import Serverless from 'serverless-http';

const DASHBOARD = "DASHBOARD";
const SUPABASE_BASEURL = "https://zdbpnksnpemcsceppiem.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYnBua3NucGVtY3NjZXBwaWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Nzc0NDksImV4cCI6MjA1NDI1MzQ0OX0.6NHVLTvHTBlrICve-NzMOjIWgzzZe-uDio1J-CtIZoc";

const supabase = createClient(SUPABASE_BASEURL, SUPABASE_KEY);
const fastify = Fastify({ logger : true });

fastify.register(FastifyCors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
});

fastify.route({
  method : 'GET',
  url : "/all",
  handler : async (request, reply) => {
    let { data, error } = await supabase.from(DASHBOARD).select();
    if (error) {
        return error;
    } else {
        return data;
    }
  }
});

export const handler = Serverless(fastify);