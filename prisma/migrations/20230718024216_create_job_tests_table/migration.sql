-- CreateTable
CREATE TABLE "job_tests" (
    "id" SERIAL NOT NULL,
    "question" JSONB NOT NULL,
    "job_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_tests" ADD CONSTRAINT "job_tests_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
