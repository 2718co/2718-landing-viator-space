import Link from "next/link";
import { formatAddress } from "../../utils/formatAddress";

const OffersTable = (): JSX.Element => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-light-background p-4 lg:p-8">
      <div className="flex flex-row items-center justify-between">
        <span className="font-mono text-title-1-size">Offers</span>
        <span className="hidden font-mono text-title-2-size font-medium text-light-text lg:block">
          <button className="rounded-full p-2 transition-all hover:bg-hover-light">
            <svg
              width="15"
              height="17"
              viewBox="0 0 15 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.97108 7.09925H15V0H13.8186V4.99245L12.8536 4.01784C9.9171 1.05195 5.13897 1.05191 2.20241 4.01784C-0.734154 6.98377 -0.734117 11.8096 2.20241 14.7756C3.61596 16.2 5.53122 17 7.52802 17C9.52481 17 11.4401 16.2 12.8536 14.7756L12.0183 13.9318C9.54233 16.4325 5.51374 16.4325 3.03785 13.9318C0.561972 11.4312 0.561935 7.36224 3.03785 4.86156C5.51377 2.36088 9.54237 2.36088 12.0183 4.86156L13.0524 5.90601H7.97108V7.09925Z"
                fill="#A2A2A2"
              />
            </svg>
          </button>{" "}
          Updated 2m ago
        </span>
      </div>
      <table className="mt-4 table-auto">
        <thead>
          <tr className="border-b border-light-text border-opacity-50 text-left font-mono text-subtitle-2-size text-light-text">
            <th>Bid</th>
            <th>USD Price</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {Array(12)
            .fill(0)
            .slice(0, 6)
            .map((_, i) => (
              <tr
                key={i}
                className="h-14 border-b border-light-text border-opacity-50 font-mono text-title-3-size lg:text-title-2-size"
              >
                <td>2.4 ETH</td>
                <td>$2,835.92</td>
                <td>
                  <Link href={"#"} className="underline">
                    <span className="hidden lg:inline">
                      {formatAddress("0x1235252313253ad")}
                    </span>
                    <span className="lg:hidden">Tx</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffersTable;
