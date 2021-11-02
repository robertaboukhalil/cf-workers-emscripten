#!/bin/bash

# Runtime benchmark
for (( N = 0; N <= 10000; N += 1000));
do
	echo -ne $N"\t"
	for (( iteration = 0; iteration < 5; iteration++ ));
	do
		RUNTIME=$(curl -s -w @<(echo "%{time_total}") -o /dev/null "https://pi.robert.workers.dev/?n=$N")
		sleep 0.2
		echo -ne $RUNTIME"\t"
	done
	echo ""
done
