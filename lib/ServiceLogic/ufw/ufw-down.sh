#!/bin/sh
UFW=`which ufw`
${UFW} reject out http
${UFW} reject out https
