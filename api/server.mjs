import Fastify from 'fastify';
import FastifyCors from '@fastify/cors';
import { createClient } from '@supabase/supabase-js';

const DASHBOARD = "DASHBOARD";
const SUPABASE_BASEURL = "https://zdbpnksnpemcsceppiem.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkYnBua3NucGVtY3NjZXBwaWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2Nzc0NDksImV4cCI6MjA1NDI1MzQ0OX0.6NHVLTvHTBlrICve-NzMOjIWgzzZe-uDio1J-CtIZoc";
const URL_INSERT = "/insert";
const URL_UPDATE_VOTE = "/update/vote";
const URL_DELETE = "/delete";
const URL_ALL = "/all";

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
  url : URL_ALL,
  handler : async (request, reply) => {
    let { data } = await supabase.from(DASHBOARD).select();
    return data;
  }
});

fastify.route({
  method : 'PUT',
  url : URL_UPDATE_VOTE,
  handler : async (request, reply) => {
    let { ID, VOTE } = request.query;
    await supabase.from(DASHBOARD).update({ vote : VOTE }).eq('id', ID);
  }
});

fastify.route({
  method : "DELETE",
  url : URL_DELETE,
  handler : async (request, reply) => {
    let { ID } = request.query;
    await supabase.from(DASHBOARD).delete().eq('id', ID);
  }
});

fastify.route({
  method : "POST",
  url : URL_INSERT,
  handler : async (request, reply) => {
    let BODY = request.body;
    await supabase.from(DASHBOARD).insert([BODY]);
  }
});

try {
  await fastify.listen({ port: process.env.port || 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}