#!/bin/sh
UFW=`which ufw`
${UFW} --force delete reject out http
${UFW} --force delete reject out https