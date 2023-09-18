package com.samplepractice.model.commonmodels;
//public class AbstractAuditingEntity {
//
//}

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;

/**
 * Base abstract class for entities which will hold definitions for created, last modified by and created,
 * last modified by date.
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditingEntity implements Serializable {

   private static final long serialVersionUID = 1L;

//   @CreatedBy
//   @Column(name = "CreatedBy", nullable = false, length = 50, updatable = false)
//   private String createdBy;

   @CreatedDate
   @Column(name = "`createddate`", updatable = false,columnDefinition = "DATE")
   private Instant createddate = Instant.now();

//   @LastModifiedBy
//   @Column(name = "ModifiedBy", length = 50)
//   private String modifiedBy;
//
//   @LastModifiedDate
//   @Column(name = "ModifiedDate")
//   private Instant modifiedDate = Instant.now();

//   public String getCreatedBy() {
//      return createdBy;
//   }
//
//   public void setCreatedBy(String createdBy) {
//      this.createdBy = createdBy;
//   }

   public Instant getCreateddate() {
      return createddate;
   }

   public void setCreateddate(Instant createddate) {
      this.createddate = createddate;
   }

   //   public Instant getCreatedDate() {
//      return createddate;
//   }
//
//   public void setCreatedDate(Instant createdDate) {
//      this.createddate = createdDate;
//   }

//   public String getModifiedBy() {
//      return modifiedBy;
//   }
//
//   public void setModifiedBy(String modifiedBy) {
//      this.modifiedBy = modifiedBy;
//   }
//
//   public Instant getModifiedDate() {
//      return modifiedDate;
//   }
//
//   public void setModifiedDate(Instant modifiedDate) {
//      this.modifiedDate = modifiedDate;
//   }
}
