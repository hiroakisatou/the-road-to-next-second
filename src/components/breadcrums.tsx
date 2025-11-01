import { faChevronRight } from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

type BreadcrumbType = {
  title: string;
  href?: string;
};

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbType[];
};



type CrumbProps = {
  title: string;
  href?: string;
  isLast: boolean;
};

const Crumb = ({ title, href, isLast }: CrumbProps) => {
  return (
    <Fragment>
      <BreadcrumbItem>
      {href ?  (
          <BreadcrumbLink asChild>
            <Link href={href} className="flex items-center gap-1">
              {title}
            </Link>
          </BreadcrumbLink>
      ) : (
        <BreadcrumbPage>{title}</BreadcrumbPage>
      )}
      </BreadcrumbItem>

      {!isLast && (
        <BreadcrumbSeparator>
        <FontAwesomeIcon icon={faChevronRight} />
       </BreadcrumbSeparator>
      )}
    </Fragment>
  );
};

const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
           const isLast: boolean = index === breadcrumbs.length - 1;
           const key  = `${breadcrumb.href ?? breadcrumb.title}-${index}`;
           return <Crumb key={key} title={breadcrumb.title} href={breadcrumb.href} isLast={isLast} />
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
export { Breadcrumbs };
