package com.example.douyin.aspect;

import com.example.douyin.utils.RequestTiming;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
@Slf4j
@Aspect
@Component
public class RequestTimingAspect {

    @Pointcut("@annotation(com.example.douyin.utils.RequestTiming)")
    public void timingAnnotation() {
    }

    @Around("timingAnnotation()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object proceed;
        try {
            proceed = joinPoint.proceed();
        } finally {
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            log.info("{} executed in {} ms", joinPoint.getSignature(), executionTime);
        }
        return proceed;
    }
}
