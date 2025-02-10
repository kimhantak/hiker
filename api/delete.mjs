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
  method : "DELETE",
  url : "/delete",
  handler : async (request, reply) => {
    let { ID } = request.query;
    await supabase.from(DASHBOARD).delete().eq('id', ID);
  }
});

try {
  await fastify.listen({ port: process.env.port || 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}

export const handler = Serverless(fastify);