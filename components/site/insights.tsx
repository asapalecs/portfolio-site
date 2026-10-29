import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const findings = [
  { quote: "Churn follows a U-shape. 2.17% in the first months, 0.82% mid-contract, 1.72% when contracts end.", name: "Telecom DW", title: "Churn analysis" },
  { quote: "A join was quietly dropping 5% of revenue. A row-count check now stops the load if that happens.", name: "Telecom DW", title: "Data quality" },
  { quote: "After fixing the leakage, the Spark model did 27% worse than just repeating yesterday's price.", name: "PySpark Analytics", title: "Model evaluation" },
  { quote: "Costs were being multiplied by a foreign key. The totals looked fine and were all wrong.", name: "Manufacturing Costs", title: "Bug fix" },
  { quote: "Python starts the week at 0 and Oracle at 1, so every weekend was labelled wrong.", name: "Dental Clinic DW", title: "ETL" },
  { quote: "ECB encryption made equal salaries look equal, without decrypting anything.", name: "Database Security", title: "Security" },
];

export function Insights() {
  return (
    <section className="border-y border-line bg-panel py-10">
      <div className="flex justify-center">
        <InfiniteMovingCards items={findings} speed="slow" className="max-w-none" />
      </div>
    </section>
  );
}
