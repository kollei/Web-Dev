let i = 0;
while (i != 10) {
  i += 0.2;
}
/*
The loop above is infinite. The reason is that 0.2 cannot be represented in binary form with perfect accuracy,
so the value of i will never be exactly 10, but will instead oscillate around it. 
Therefore, the condition i != 10 will always be true, causing the loop to run indefinitely.
*/